/* eslint-disable no-console */
/*
  DevTools usage:
  1. Open this file and paste all content into the browser DevTools Console.
  2. It auto-runs once. Rerun with:
     window.__amanahBorderCollisionAudit.run({ highlight: true })
  3. It downloads a JSON file automatically. Send that file back for fixes.
*/

(() => {
  const AUDIT_API_NAME = '__amanahBorderCollisionAudit';
  const LAST_REPORT_NAME = '__lastBorderCollisionAudit';
  const HIGHLIGHT_CLASS_NAME = '__border-collision-audit-highlight';

  const DEFAULT_OPTIONS = {
    copyToClipboard: true,
    downloadJsonFile: true,
    fileNamePrefix: 'amanah-border-collision-audit',
    hairlineMaxThickness: 2,
    highlight: true,
    includeNearMisses: true,
    includeStackedSeams: true,
    includeVisualEdges: true,
    maxCollisions: 500,
    maxHighlights: 120,
    minLineLength: 32,
    minOverlap: 80,
    nearMissDistance: 3,
    root: '.min-h-screen.bg-background.text-foreground',
    stackedSeamDistance: 3,
    tolerance: 1.25,
  };

  const TRANSPARENT_COLOR_PATTERNS = [
    'rgba(0, 0, 0, 0)',
    'rgba(0,0,0,0)',
    'transparent',
  ];

  function toNumber(value) {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function isTransparentColor(color) {
    return TRANSPARENT_COLOR_PATTERNS.includes(String(color).replace(/\s+/g, ' ').toLowerCase());
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

    return String(value).replace(/[^a-zA-Z0-9_-]/g, '\\$&');
  }

  function getElementLabel(element) {
    const tagName = element.tagName.toLowerCase();
    const id = element.id ? `#${cssEscape(element.id)}` : '';
    const className = Array.from(element.classList)
      .slice(0, 6)
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
      && parts.length < 8
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

    return (
      heading.getAttribute('aria-label')
      || getTextSnippet(heading)
    );
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

  function getElementContext(element) {
    const rect = getDocumentRect(element);
    const landmark = getLandmarkLabel(element);

    return {
      heading: getNearestHeadingText(element),
      landmark,
      top: round(rect.top),
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

  function hasAuditableVisualEdge(element) {
    const style = window.getComputedStyle(element);
    const tagName = element.tagName.toLowerCase();
    const mediaTags = ['canvas', 'img', 'picture', 'svg', 'video'];

    return (
      mediaTags.includes(tagName)
      || style.backgroundImage !== 'none'
      || element.querySelector(':scope > img, :scope > picture, :scope > video, :scope > canvas, :scope > svg')
    );
  }

  function collectVisualEdges(element, options) {
    if (!options.includeVisualEdges || !hasAuditableVisualEdge(element)) {
      return [];
    }

    const rect = getDocumentRect(element);

    if (rect.width < options.minLineLength || rect.height < options.minLineLength) {
      return [];
    }

    return [
      createLine({
        axis: rect.top,
        color: 'visual-edge',
        element,
        end: rect.right,
        orientation: 'horizontal',
        side: 'visual-top-edge',
        source: 'visual-edge',
        start: rect.left,
        thickness: 0,
      }),
      createLine({
        axis: rect.bottom,
        color: 'visual-edge',
        element,
        end: rect.right,
        orientation: 'horizontal',
        side: 'visual-bottom-edge',
        source: 'visual-edge',
        start: rect.left,
        thickness: 0,
      }),
      createLine({
        axis: rect.left,
        color: 'visual-edge',
        element,
        end: rect.bottom,
        orientation: 'vertical',
        side: 'visual-left-edge',
        source: 'visual-edge',
        start: rect.top,
        thickness: 0,
      }),
      createLine({
        axis: rect.right,
        color: 'visual-edge',
        element,
        end: rect.bottom,
        orientation: 'vertical',
        side: 'visual-right-edge',
        source: 'visual-edge',
        start: rect.top,
        thickness: 0,
      }),
    ];
  }

  function round(value) {
    return Math.round(value * 100) / 100;
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
      ...collectBorderLines(element, options),
      ...collectHairlineElement(element, options),
      ...collectVisualEdges(element, options),
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

  function getSuggestion(lineA, lineB) {
    const sides = [lineA.side, lineB.side].join(' + ');

    if ([lineA.source, lineB.source].includes('visual-edge')) {
      return 'A media/background visual edge aligns with a rail. If it looks thick, add breathing room or let only the shared rail draw the seam.';
    }

    if (lineA.source !== lineB.source) {
      return 'Choose one owner: keep the shared hairline/ViewportLine or the local border, not both.';
    }

    if (sides.includes('border-bottom') && sides.includes('border-top')) {
      return 'Adjacent rows are both drawing the same wall. Keep bottom on the upper row or top on the lower row.';
    }

    if (lineA.source === 'hairline-element') {
      return 'Two hairline elements overlap. Only one shared line component should own this rail.';
    }

    return 'Two local borders overlap. Move the wall to the parent row or remove one child border.';
  }

  function getCollisionLocation(lineA, lineB, overlap) {
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

  function createCollision(lineA, lineB, overlap) {
    const distance = round(Math.abs(lineA.axis - lineB.axis));

    return {
      axis: round((lineA.axis + lineB.axis) / 2),
      distance,
      kind: 'collision',
      location: getCollisionLocation(lineA, lineB, overlap),
      orientation: lineA.orientation,
      overlap,
      pairKind: getPairKind(lineA, lineB),
      severity: distance <= 0.35 ? 'high' : 'medium',
      suggestion: getSuggestion(lineA, lineB),
      lines: [lineA, lineB],
    };
  }

  function getGap(lineA, lineB) {
    if (lineA.end < lineB.start) {
      return round(lineB.start - lineA.end);
    }

    if (lineB.end < lineA.start) {
      return round(lineA.start - lineB.end);
    }

    return 0;
  }

  function createNearMiss(lineA, lineB) {
    const start = Math.min(lineA.end, lineB.end);
    const end = Math.max(lineA.start, lineB.start);
    const gap = getGap(lineA, lineB);
    const overlap = getOverlap(lineA, lineB);

    return {
      axis: round((lineA.axis + lineB.axis) / 2),
      distance: round(Math.abs(lineA.axis - lineB.axis)),
      gap,
      kind: 'near-miss',
      location: getCollisionLocation(lineA, lineB, gap === 0 ? overlap : {
        end: round(end),
        length: 0,
        start: round(start),
      }),
      orientation: lineA.orientation,
      overlap,
      pairKind: getPairKind(lineA, lineB),
      severity: 'near-miss',
      suggestion: 'Lines are very close on the same rail. Check if this creates a visually thick seam at the cross point.',
      lines: [lineA, lineB],
    };
  }

  function getFindingKey(finding) {
    return finding.lines
      .map(line => `${line.element.path}:${line.side}`)
      .sort()
      .join(' | ');
  }

  function getLinePairKey(lineA, lineB) {
    return [lineA, lineB]
      .map(line => `${line.element.path}:${line.side}`)
      .sort()
      .join(' | ');
  }

  function findCollisions(lines, options) {
    const collisions = [];

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

        if (Math.abs(lineA.axis - lineB.axis) > options.tolerance) {
          continue;
        }

        const overlap = getOverlap(lineA, lineB);

        if (overlap.length < options.minOverlap) {
          continue;
        }

        collisions.push(createCollision(lineA, lineB, overlap));
      }
    }

    return collisions
      .sort((a, b) => b.overlap.length - a.overlap.length || a.distance - b.distance)
      .slice(0, options.maxCollisions);
  }

  function findNearMisses(lines, collisions, options) {
    if (!options.includeNearMisses) {
      return [];
    }

    const existingCollisionKeys = new Set(collisions.map(getFindingKey));
    const nearMisses = [];

    for (let indexA = 0; indexA < lines.length; indexA += 1) {
      for (let indexB = indexA + 1; indexB < lines.length; indexB += 1) {
        const lineA = lines[indexA];
        const lineB = lines[indexB];

        if (lineA.orientation !== lineB.orientation) {
          continue;
        }

        if (Math.abs(lineA.axis - lineB.axis) > options.tolerance) {
          continue;
        }

        const pairKey = getLinePairKey(lineA, lineB);

        if (existingCollisionKeys.has(pairKey)) {
          continue;
        }

        const gap = getGap(lineA, lineB);

        if (gap === 0 || gap > options.nearMissDistance) {
          continue;
        }

        nearMisses.push(createNearMiss(lineA, lineB));
      }
    }

    return nearMisses
      .sort((a, b) => a.gap - b.gap || a.distance - b.distance)
      .slice(0, options.maxCollisions);
  }

  function getStackedSeamSuggestion(lineA, lineB) {
    const sides = [lineA.side, lineB.side].join(' + ');

    if (sides.includes('border-bottom') && sides.includes('border-top')) {
      return 'Stacked seam: an upper bottom border and a lower top border are both drawing the same visual wall. Remove the lower top border or the upper bottom border.';
    }

    if ([lineA.source, lineB.source].includes('visual-edge')) {
      return 'Stacked seam: a media/background edge is too close to a rail and reads as a double line. Add spacing or remove the adjacent rail.';
    }

    if (lineA.source !== lineB.source) {
      return 'Stacked seam: a local border is too close to a shared hairline. Keep one rail owner only.';
    }

    return 'Stacked seam: two nearby rails overlap horizontally and read as a thicker line. Keep only one rail owner.';
  }

  function createStackedSeam(lineA, lineB, overlap) {
    const distance = round(Math.abs(lineA.axis - lineB.axis));

    return {
      axis: round((lineA.axis + lineB.axis) / 2),
      distance,
      kind: 'stacked-border-seam',
      location: getCollisionLocation(lineA, lineB, overlap),
      orientation: lineA.orientation,
      overlap,
      pairKind: getPairKind(lineA, lineB),
      severity: 'stacked-seam',
      suggestion: getStackedSeamSuggestion(lineA, lineB),
      lines: [lineA, lineB],
    };
  }

  function findStackedSeams(lines, existingFindings, options) {
    if (!options.includeStackedSeams) {
      return [];
    }

    const existingKeys = new Set(existingFindings.map(getFindingKey));
    const seams = [];

    for (let indexA = 0; indexA < lines.length; indexA += 1) {
      for (let indexB = indexA + 1; indexB < lines.length; indexB += 1) {
        const lineA = lines[indexA];
        const lineB = lines[indexB];

        if (lineA.orientation !== 'horizontal' || lineB.orientation !== 'horizontal') {
          continue;
        }

        if (lineA.element.path === lineB.element.path) {
          continue;
        }

        const pairKey = getLinePairKey(lineA, lineB);

        if (existingKeys.has(pairKey)) {
          continue;
        }

        const distance = Math.abs(lineA.axis - lineB.axis);

        if (distance <= options.tolerance || distance > options.stackedSeamDistance) {
          continue;
        }

        const overlap = getOverlap(lineA, lineB);

        if (overlap.length < options.minOverlap) {
          continue;
        }

        seams.push(createStackedSeam(lineA, lineB, overlap));
      }
    }

    return seams
      .sort((a, b) => a.distance - b.distance || b.overlap.length - a.overlap.length)
      .slice(0, options.maxCollisions);
  }

  function getCollisionSummary(collisions) {
    return collisions.reduce((summary, collision) => {
      summary.byOrientation[collision.orientation] = (summary.byOrientation[collision.orientation] || 0) + 1;
      summary.byPairKind[collision.pairKind] = (summary.byPairKind[collision.pairKind] || 0) + 1;
      summary.bySeverity[collision.severity] = (summary.bySeverity[collision.severity] || 0) + 1;

      return summary;
    }, {
      byOrientation: {},
      byPairKind: {},
      bySeverity: {},
    });
  }

  function clearHighlights() {
    document
      .querySelectorAll(`.${HIGHLIGHT_CLASS_NAME}`)
      .forEach(element => element.remove());
  }

  function addHighlights(collisions, options) {
    const fragment = document.createDocumentFragment();

    collisions.slice(0, options.maxHighlights).forEach((collision, index) => {
      const marker = document.createElement('div');
      const isHorizontal = collision.orientation === 'horizontal';

      marker.className = HIGHLIGHT_CLASS_NAME;
      marker.title = `Border collision #${index + 1}: ${collision.suggestion}`;
      marker.style.cssText = [
        'position:absolute',
        'z-index:2147483647',
        'pointer-events:none',
        'background:rgba(255, 0, 64, 0.34)',
        'outline:1px solid rgba(255, 0, 64, 0.9)',
        'box-shadow:0 0 0 2px rgba(255,255,255,0.75)',
      ].join(';');

      if (isHorizontal) {
        marker.style.left = `${collision.overlap.length > 0 ? collision.overlap.start : collision.location.approximateDocumentRange.start}px`;
        marker.style.top = `${collision.axis - 2}px`;
        marker.style.width = `${Math.max(collision.overlap.length, 16)}px`;
        marker.style.height = '4px';
      } else {
        marker.style.left = `${collision.axis - 2}px`;
        marker.style.top = `${collision.overlap.length > 0 ? collision.overlap.start : collision.location.approximateDocumentRange.start}px`;
        marker.style.width = '4px';
        marker.style.height = `${Math.max(collision.overlap.length, 16)}px`;
      }

      fragment.appendChild(marker);
    });

    document.body.appendChild(fragment);
  }

  function createReport(lines, collisions, options, root) {
    return {
      generatedAt: new Date().toISOString(),
      location: window.location.href,
      options,
      root: getElementPath(root),
      summary: {
        collisionCount: collisions.length,
        lineCount: lines.length,
        ...getCollisionSummary(collisions),
      },
      viewport: {
        height: window.innerHeight,
        scrollX: round(window.scrollX),
        scrollY: round(window.scrollY),
        width: window.innerWidth,
      },
      collisions,
    };
  }

  async function copyReport(report, options) {
    if (!options.copyToClipboard) {
      return;
    }

    const text = JSON.stringify(report, null, 2);

    try {
      await navigator.clipboard.writeText(text);
      console.info('[border-audit] JSON copied to clipboard.');
    } catch {
      console.info('[border-audit] Clipboard copy blocked. Run: copy(window.__lastBorderCollisionAudit)');
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
    console.info(`[border-audit] JSON download started: ${link.download}`);
  }

  function logReport(report) {
    const table = report.collisions.slice(0, 30).map((collision, index) => ({
      index: index + 1,
      axis: collision.axis,
      distance: collision.distance,
      kind: collision.kind,
      orientation: collision.orientation,
      overlap: collision.overlap.length,
      pairKind: collision.pairKind,
      severity: collision.severity,
      location: collision.location.primary.label,
      headings: collision.location.headings.join(' | '),
      first: `${collision.lines[0].side} ${collision.lines[0].element.label}`,
      second: `${collision.lines[1].side} ${collision.lines[1].element.label}`,
    }));

    console.info('[border-audit] Report:', report);
    console.table(table);
  }

  function run(userOptions = {}) {
    const options = { ...DEFAULT_OPTIONS, ...userOptions };
    const root = getRootElement(options.root);

    clearHighlights();

    const lines = collectLines(root, options);
    const collisions = findCollisions(lines, options);
    const nearMisses = findNearMisses(lines, collisions, options);
    const stackedSeams = findStackedSeams(lines, [...collisions, ...nearMisses], options);
    const findings = [...collisions, ...stackedSeams, ...nearMisses];
    const report = createReport(lines, findings, options, root);

    window[LAST_REPORT_NAME] = report;

    if (options.highlight) {
      addHighlights(findings, options);
    }

    logReport(report);
    downloadReport(report, options);
    void copyReport(report, options);

    return report;
  }

  window[AUDIT_API_NAME] = {
    clearHighlights,
    downloadLast() {
      const lastReport = window[LAST_REPORT_NAME];

      if (!lastReport) {
        console.warn('[border-audit] No previous report found. Run the audit first.');
        return null;
      }

      downloadReport(lastReport, DEFAULT_OPTIONS);
      return lastReport;
    },
    run,
  };

  console.info(`[border-audit] Ready. Rerun with window.${AUDIT_API_NAME}.run({ highlight: true })`);
  run();
})();
