/*
  DevTools usage:
  1. Open this file and paste all content into the browser DevTools Console.
  2. It auto-runs once. Rerun with:
     window.__amanahBorderStackInspector.run({ highlight: true })
  3. It downloads a JSON file automatically. Send that file back for fixes.

  Purpose:
  This is intentionally separate from border-collision-audit.js.
  It detects nearby parallel rails that visually read as stacked/double lines,
  even when they are not mathematically colliding on the same exact axis.
*/

(() => {
  const INSPECTOR_API_NAME = '__amanahBorderStackInspector';
  const LAST_REPORT_NAME = '__lastBorderStackInspection';
  const HIGHLIGHT_CLASS_NAME = '__border-stack-inspector-highlight';

  const DEFAULT_OPTIONS = {
    copyToClipboard: true,
    downloadJsonFile: true,
    fileNamePrefix: 'amanah-border-stack-inspect',
    hairlineMaxThickness: 2,
    highlight: true,
    maxHighlights: 140,
    maxStackDistance: 16,
    minAxisDistance: 1.25,
    minLineLength: 32,
    minOverlap: 96,
    root: '.min-h-screen.bg-background.text-foreground',
  };

  const TRANSPARENT_COLOR_PATTERNS = [
    'rgba(0, 0, 0, 0)',
    'rgba(0,0,0,0)',
    'transparent',
  ];

  const SOURCE_KEEP_SCORE = {
    'border': 20,
    'hairline-element': 30,
  };

  function round(value) {
    return Math.round(value * 100) / 100;
  }

  function toNumber(value) {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function normalizeColor(color) {
    return String(color).replace(/\s+/g, ' ').toLowerCase();
  }

  function isTransparentColor(color) {
    return TRANSPARENT_COLOR_PATTERNS.includes(normalizeColor(color));
  }

  function isVisibleElement(element) {
    const style = window.getComputedStyle(element);
    const rect = element.getBoundingClientRect();

    return (
      style.display !== 'none'
      && style.visibility !== 'hidden'
      && toNumber(style.opacity) > 0
      && rect.width > 0
      && rect.height > 0
    );
  }

  function isVisibleBorder(style, side) {
    const width = toNumber(style[`border${side}Width`]);
    const borderStyle = style[`border${side}Style`];
    const color = style[`border${side}Color`];

    return (
      width > 0
      && borderStyle !== 'none'
      && borderStyle !== 'hidden'
      && !isTransparentColor(color)
    );
  }

  function hasVisibleBackground(style) {
    return !isTransparentColor(style.backgroundColor) && toNumber(style.opacity) > 0;
  }

  function cssEscape(value) {
    if (window.CSS && typeof window.CSS.escape === 'function') {
      return window.CSS.escape(value);
    }

    return String(value).replace(/[^\w-]/g, '\\$&');
  }

  function getElementLabel(element) {
    const tagName = element.tagName.toLowerCase();
    const id = element.id ? `#${cssEscape(element.id)}` : '';
    const className = Array.from(element.classList)
      .slice(0, 7)
      .map(name => `.${cssEscape(name)}`)
      .join('');

    return `${tagName}${id}${className}`;
  }

  function getElementPath(element) {
    const parts = [];
    let current = element;

    while (
      current
      && current.nodeType === Node.ELEMENT_NODE
      && current !== document.documentElement
      && parts.length < 9
    ) {
      let part = getElementLabel(current);
      const parent = current.parentElement;

      if (parent && !current.id) {
        const sameTagSiblings = Array.from(parent.children)
          .filter(sibling => sibling.tagName === current.tagName);

        if (sameTagSiblings.length > 1) {
          part += `:nth-of-type(${sameTagSiblings.indexOf(current) + 1})`;
        }
      }

      parts.unshift(part);
      current = parent;
    }

    return parts.join(' > ');
  }

  function getTextSnippet(element) {
    return (element.textContent || '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 90);
  }

  function getNearestHeadingText(element) {
    const scopedRoot = element.closest('section, footer, header, main, article, aside') || element;
    const heading = scopedRoot.querySelector('h1, h2, h3, [aria-label]');

    if (!heading) {
      return '';
    }

    return heading.getAttribute('aria-label') || getTextSnippet(heading);
  }

  function getLandmarkLabel(element) {
    const landmark = element.closest('section[id], footer, header, main, aside, article');

    if (!landmark) {
      return {
        id: '',
        label: 'document',
        path: '',
        tag: 'document',
      };
    }

    const tag = landmark.tagName.toLowerCase();
    const id = landmark.id || '';
    const ariaLabel = landmark.getAttribute('aria-label') || '';
    const headingText = getNearestHeadingText(landmark);
    const label = id ? `#${id}` : (ariaLabel || headingText || tag);

    return {
      id,
      label,
      path: getElementPath(landmark),
      tag,
    };
  }

  function getDocumentRect(element) {
    const rect = element.getBoundingClientRect();

    return {
      bottom: rect.bottom + window.scrollY,
      height: rect.height,
      left: rect.left + window.scrollX,
      right: rect.right + window.scrollX,
      top: rect.top + window.scrollY,
      width: rect.width,
    };
  }

  function getElementContext(element) {
    const rect = getDocumentRect(element);
    const landmark = getLandmarkLabel(element);

    return {
      heading: getNearestHeadingText(element),
      landmark,
      top: round(rect.top),
    };
  }

  function createLine({ axis, color, element, end, orientation, side, source, start, thickness }) {
    return {
      axis: round(axis),
      color,
      element: {
        context: getElementContext(element),
        label: getElementLabel(element),
        path: getElementPath(element),
        text: getTextSnippet(element),
      },
      end: round(end),
      length: round(Math.max(0, end - start)),
      orientation,
      side,
      source,
      start: round(start),
      thickness: round(thickness),
    };
  }

  function collectBorderLines(element) {
    const style = window.getComputedStyle(element);
    const rect = getDocumentRect(element);
    const lines = [];

    if (isVisibleBorder(style, 'Top')) {
      lines.push(createLine({
        axis: rect.top,
        color: style.borderTopColor,
        element,
        end: rect.right,
        orientation: 'horizontal',
        side: 'border-top',
        source: 'border',
        start: rect.left,
        thickness: toNumber(style.borderTopWidth),
      }));
    }

    if (isVisibleBorder(style, 'Bottom')) {
      lines.push(createLine({
        axis: rect.bottom,
        color: style.borderBottomColor,
        element,
        end: rect.right,
        orientation: 'horizontal',
        side: 'border-bottom',
        source: 'border',
        start: rect.left,
        thickness: toNumber(style.borderBottomWidth),
      }));
    }

    if (isVisibleBorder(style, 'Left')) {
      lines.push(createLine({
        axis: rect.left,
        color: style.borderLeftColor,
        element,
        end: rect.bottom,
        orientation: 'vertical',
        side: 'border-left',
        source: 'border',
        start: rect.top,
        thickness: toNumber(style.borderLeftWidth),
      }));
    }

    if (isVisibleBorder(style, 'Right')) {
      lines.push(createLine({
        axis: rect.right,
        color: style.borderRightColor,
        element,
        end: rect.bottom,
        orientation: 'vertical',
        side: 'border-right',
        source: 'border',
        start: rect.top,
        thickness: toNumber(style.borderRightWidth),
      }));
    }

    return lines;
  }

  function collectHairlineElement(element, options) {
    const style = window.getComputedStyle(element);
    const rect = getDocumentRect(element);

    if (!hasVisibleBackground(style)) {
      return [];
    }

    if (rect.height <= options.hairlineMaxThickness && rect.width >= options.minLineLength) {
      return [createLine({
        axis: rect.top + (rect.height / 2),
        color: style.backgroundColor,
        element,
        end: rect.right,
        orientation: 'horizontal',
        side: 'hairline-horizontal',
        source: 'hairline-element',
        start: rect.left,
        thickness: rect.height,
      })];
    }

    if (rect.width <= options.hairlineMaxThickness && rect.height >= options.minLineLength) {
      return [createLine({
        axis: rect.left + (rect.width / 2),
        color: style.backgroundColor,
        element,
        end: rect.bottom,
        orientation: 'vertical',
        side: 'hairline-vertical',
        source: 'hairline-element',
        start: rect.top,
        thickness: rect.width,
      })];
    }

    return [];
  }

  function getRootElement(rootOption) {
    if (rootOption instanceof Element) {
      return rootOption;
    }

    return document.querySelector(rootOption) || document.body;
  }

  function collectLines(root, options) {
    const elements = [root, ...Array.from(root.querySelectorAll('*'))]
      .filter(isVisibleElement);

    return elements.flatMap(element => [
      ...collectBorderLines(element),
      ...collectHairlineElement(element, options),
    ]);
  }

  function getOverlap(lineA, lineB) {
    const start = Math.max(lineA.start, lineB.start);
    const end = Math.min(lineA.end, lineB.end);

    return {
      end: round(end),
      length: round(Math.max(0, end - start)),
      start: round(start),
    };
  }

  function getPairKind(lineA, lineB) {
    return [lineA.source, lineB.source].sort().join(' + ');
  }

  function getLineKey(line) {
    return `${line.orientation}:${line.axis}:${line.start}:${line.end}:${line.element.path}:${line.side}`;
  }

  function getStackLocation(lineA, lineB, overlap) {
    const contexts = [lineA.element.context, lineB.element.context];
    const primaryContext = contexts.find(context => context.landmark.id)
      || contexts.find(context => context.landmark.label !== 'document')
      || contexts[0];
    const labels = Array.from(new Set(contexts.map(context => context.landmark.label)));

    return {
      approximateDocumentRange: {
        end: overlap.end,
        start: overlap.start,
      },
      headings: Array.from(new Set(contexts.map(context => context.heading).filter(Boolean))),
      landmarks: labels,
      primary: primaryContext.landmark,
    };
  }

  function getKeeperScore(line, overlap) {
    const sourceScore = SOURCE_KEEP_SCORE[line.source] || 0;
    const lengthScore = Math.min(line.length, 1200) / 100;
    const overlapScore = Math.min(overlap.length, 1200) / 120;
    const shallowPathScore = Math.max(0, 12 - line.element.path.split('>').length);

    return round(sourceScore + lengthScore + overlapScore + shallowPathScore);
  }

  function getKeepPlan(lineA, lineB, overlap) {
    const scoreA = getKeeperScore(lineA, overlap);
    const scoreB = getKeeperScore(lineB, overlap);
    const keep = scoreA >= scoreB ? lineA : lineB;
    const remove = keep === lineA ? lineB : lineA;

    return {
      keepCandidate: {
        line: keep,
        reason: 'Keeps the rail with stronger shared-line characteristics: source type, span length, overlap length, and shallower DOM ownership.',
        score: keep === lineA ? scoreA : scoreB,
      },
      removeCandidate: {
        line: remove,
        reason: 'This nearby parallel rail is the most likely redundant stack member.',
        score: remove === lineA ? scoreA : scoreB,
      },
      scores: {
        first: scoreA,
        second: scoreB,
      },
    };
  }

  function getGroupKeepPlan(lines) {
    const scoredLines = lines
      .map(line => ({
        line,
        score: getKeeperScore(line, { length: line.length }),
      }))
      .sort((a, b) => b.score - a.score || b.line.length - a.line.length);
    const keepCandidate = scoredLines[0];
    const removeCandidates = scoredLines.slice(1);

    return {
      keepCandidate: {
        line: keepCandidate.line,
        reason: 'Highest shared-rail score inside this stack group.',
        score: keepCandidate.score,
      },
      removeCandidates: removeCandidates.map(candidate => ({
        line: candidate.line,
        reason: 'Redundant parallel rail candidate in the same stack group.',
        score: candidate.score,
      })),
    };
  }

  function getStackSuggestion(lineA, lineB) {
    const sides = [lineA.side, lineB.side].join(' + ');

    if (sides.includes('border-bottom') && sides.includes('border-top')) {
      return 'Parallel stack from adjacent vertical rhythm: keep one seam owner, either the upper bottom border or the lower top border.';
    }

    if (lineA.source !== lineB.source) {
      return 'Parallel stack from mixed rail owners: keep the shared rail/hairline or the local border, not both.';
    }

    if (lineA.source === 'hairline-element') {
      return 'Parallel stack from multiple hairline elements. Keep one shared rail component for this band.';
    }

    return 'Parallel stack from nearby borders. Move ownership to one parent/row or remove one child-side border.';
  }

  function createStackPair(lineA, lineB, overlap) {
    const distance = round(Math.abs(lineA.axis - lineB.axis));
    const keepPlan = getKeepPlan(lineA, lineB, overlap);

    return {
      axisBand: {
        end: round(Math.max(lineA.axis, lineB.axis)),
        start: round(Math.min(lineA.axis, lineB.axis)),
      },
      distance,
      kind: 'parallel-stack',
      location: getStackLocation(lineA, lineB, overlap),
      orientation: lineA.orientation,
      overlap,
      pairKind: getPairKind(lineA, lineB),
      severity: distance <= 6 ? 'high' : 'medium',
      suggestion: getStackSuggestion(lineA, lineB),
      keepPlan,
      lines: [lineA, lineB],
    };
  }

  function findStackPairs(lines, options) {
    const pairs = [];

    for (let indexA = 0; indexA < lines.length; indexA += 1) {
      for (let indexB = indexA + 1; indexB < lines.length; indexB += 1) {
        const lineA = lines[indexA];
        const lineB = lines[indexB];

        if (lineA.orientation !== lineB.orientation) {
          continue;
        }

        if (lineA.element.path === lineB.element.path && lineA.side === lineB.side) {
          continue;
        }

        const distance = Math.abs(lineA.axis - lineB.axis);

        if (distance <= options.minAxisDistance || distance > options.maxStackDistance) {
          continue;
        }

        const overlap = getOverlap(lineA, lineB);

        if (overlap.length < options.minOverlap) {
          continue;
        }

        pairs.push(createStackPair(lineA, lineB, overlap));
      }
    }

    return pairs.sort((a, b) => (
      a.distance - b.distance
      || b.overlap.length - a.overlap.length
      || a.axisBand.start - b.axisBand.start
    ));
  }

  function getGroupKey(stackPair) {
    const roundedAxis = Math.round(stackPair.axisBand.start / 24) * 24;
    const roundedStart = Math.round(stackPair.overlap.start / 48) * 48;
    const section = stackPair.location.primary.label;

    return [
      stackPair.orientation,
      section,
      roundedAxis,
      roundedStart,
    ].join(':');
  }

  function groupStackPairs(stackPairs) {
    const groupsByKey = new Map();

    stackPairs.forEach((pair) => {
      const key = getGroupKey(pair);
      const existing = groupsByKey.get(key) || [];
      existing.push(pair);
      groupsByKey.set(key, existing);
    });

    return Array.from(groupsByKey.entries()).map(([key, pairs], index) => {
      const uniqueLines = new Map();

      pairs.forEach((pair) => {
        pair.lines.forEach(line => uniqueLines.set(getLineKey(line), line));
      });

      const lines = Array.from(uniqueLines.values())
        .sort((a, b) => a.axis - b.axis || a.start - b.start);
      const axisValues = lines.map(line => line.axis);
      const keepPlan = getGroupKeepPlan(lines);

      return {
        id: `stack-group-${index + 1}`,
        axisBand: {
          end: round(Math.max(...axisValues)),
          start: round(Math.min(...axisValues)),
        },
        key,
        keepPlan,
        lineCount: lines.length,
        location: pairs[0].location,
        orientation: pairs[0].orientation,
        pairs,
        stackDepth: lines.length,
        suggestion: lines.length > 1
          ? 'This rail band has multiple close parallel lines. Keep one visual rail owner and remove the redundant members.'
          : pairs[0].suggestion,
        lines,
      };
    }).sort((a, b) => (
      a.axisBand.start - b.axisBand.start
      || b.lineCount - a.lineCount
    ));
  }

  function clearHighlights() {
    document
      .querySelectorAll(`.${HIGHLIGHT_CLASS_NAME}`)
      .forEach(element => element.remove());
  }

  function createHighlight(line, options, color, label) {
    const marker = document.createElement('div');
    const isHorizontal = line.orientation === 'horizontal';

    marker.className = HIGHLIGHT_CLASS_NAME;
    marker.title = label;
    marker.style.cssText = [
      'position:absolute',
      'z-index:2147483647',
      'pointer-events:none',
      `background:${color}`,
      'box-shadow:0 0 0 1px rgba(255,255,255,0.75)',
    ].join(';');

    if (isHorizontal) {
      marker.style.left = `${line.start}px`;
      marker.style.top = `${line.axis - 2}px`;
      marker.style.width = `${Math.max(line.length, options.minLineLength)}px`;
      marker.style.height = '4px';
    } else {
      marker.style.left = `${line.axis - 2}px`;
      marker.style.top = `${line.start}px`;
      marker.style.width = '4px';
      marker.style.height = `${Math.max(line.length, options.minLineLength)}px`;
    }

    return marker;
  }

  function addHighlights(groups, options) {
    const fragment = document.createDocumentFragment();
    let count = 0;

    groups.forEach((group) => {
      const keepLineKey = getLineKey(group.keepPlan.keepCandidate.line);

      group.lines.forEach((line, index) => {
        if (count >= options.maxHighlights) {
          return;
        }

        const color = getLineKey(line) === keepLineKey
          ? 'rgba(0, 170, 90, 0.45)'
          : 'rgba(255, 145, 0, 0.48)';
        const label = `${group.id}: stack line ${index + 1} of ${group.lines.length}`;

        fragment.appendChild(createHighlight(line, options, color, label));
        count += 1;
      });
    });

    document.body.appendChild(fragment);
  }

  function getSummary(stackPairs, groups, lines) {
    return stackPairs.reduce((summary, pair) => {
      summary.byOrientation[pair.orientation] = (summary.byOrientation[pair.orientation] || 0) + 1;
      summary.byPairKind[pair.pairKind] = (summary.byPairKind[pair.pairKind] || 0) + 1;
      summary.bySeverity[pair.severity] = (summary.bySeverity[pair.severity] || 0) + 1;

      return summary;
    }, {
      byOrientation: {},
      byPairKind: {},
      bySeverity: {},
      lineCount: lines.length,
      stackGroupCount: groups.length,
      stackPairCount: stackPairs.length,
    });
  }

  function createReport(lines, stackPairs, groups, options, root) {
    return {
      generatedAt: new Date().toISOString(),
      location: window.location.href,
      options,
      root: getElementPath(root),
      summary: getSummary(stackPairs, groups, lines),
      viewport: {
        height: window.innerHeight,
        scrollX: round(window.scrollX),
        scrollY: round(window.scrollY),
        width: window.innerWidth,
      },
      stackPairs,
      stackGroups: groups,
    };
  }

  async function copyReport(report, options) {
    if (!options.copyToClipboard) {
      return;
    }

    const text = JSON.stringify(report, null, 2);

    try {
      await navigator.clipboard.writeText(text);
      console.info('[border-stack-inspector] JSON copied to clipboard.');
    } catch {
      console.info('[border-stack-inspector] Clipboard copy blocked. Run: copy(window.__lastBorderStackInspection)');
    }
  }

  function getReportFileName(report, options) {
    const timestamp = report.generatedAt
      .replaceAll(':', '-')
      .replaceAll('.', '-');

    return `${options.fileNamePrefix}-${timestamp}.json`;
  }

  function downloadReport(report, options) {
    if (!options.downloadJsonFile) {
      return;
    }

    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = getReportFileName(report, options);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    console.info(`[border-stack-inspector] JSON download started: ${link.download}`);
  }

  function logReport(report) {
    const table = report.stackPairs.slice(0, 40).map((pair, index) => ({
      index: index + 1,
      axisStart: pair.axisBand.start,
      axisEnd: pair.axisBand.end,
      distance: pair.distance,
      orientation: pair.orientation,
      overlap: pair.overlap.length,
      pairKind: pair.pairKind,
      severity: pair.severity,
      location: pair.location.primary.label,
      headings: pair.location.headings.join(' | '),
      keep: `${pair.keepPlan.keepCandidate.line.side} ${pair.keepPlan.keepCandidate.line.element.label}`,
      remove: `${pair.keepPlan.removeCandidate.line.side} ${pair.keepPlan.removeCandidate.line.element.label}`,
    }));

    console.info('[border-stack-inspector] Report:', report);
    console.table(table);
  }

  function run(userOptions = {}) {
    const options = { ...DEFAULT_OPTIONS, ...userOptions };
    const root = getRootElement(options.root);

    clearHighlights();

    const lines = collectLines(root, options);
    const stackPairs = findStackPairs(lines, options);
    const groups = groupStackPairs(stackPairs);
    const report = createReport(lines, stackPairs, groups, options, root);

    window[LAST_REPORT_NAME] = report;

    if (options.highlight) {
      addHighlights(groups, options);
    }

    logReport(report);
    downloadReport(report, options);
    void copyReport(report, options);

    return report;
  }

  window[INSPECTOR_API_NAME] = {
    clearHighlights,
    downloadLast() {
      const lastReport = window[LAST_REPORT_NAME];

      if (!lastReport) {
        console.warn('[border-stack-inspector] No previous report found. Run the inspector first.');
        return null;
      }

      downloadReport(lastReport, DEFAULT_OPTIONS);
      return lastReport;
    },
    run,
  };

  console.info(`[border-stack-inspector] Ready. Rerun with window.${INSPECTOR_API_NAME}.run({ highlight: true })`);
  run();
})();
