'use client';

import type { CSSProperties, ReactNode } from 'react';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/utils/Helpers';

type PrincipleId = 'aman' | 'cepat' | 'peduli' | 'profesional' | 'ramah' | 'terpercaya';
type RevealDirection = -1 | 1;

type AbsoluteBox = {
  height: number;
  left: number;
  top: number;
  width: number;
};

type BrickRow = {
  index: number;
  lefts: number[];
  top: number;
};

type BrickCell = {
  box: AbsoluteBox;
  key: string;
  principleId?: PrincipleId;
  row: number;
};

type PrincipleBrick = {
  badgeClass: string;
  box: AbsoluteBox;
  description: string;
  icon: ReactNode;
  id: PrincipleId;
  imageSrc: string;
  revealDirection: RevealDirection;
  ringClass: string;
  row: number;
  title: string;
};

const STAGE_BOX: AbsoluteBox = {
  height: 720,
  left: 0,
  top: 0,
  width: 1040,
};

const BRICK_WIDTH = 340;
const BRICK_HEIGHT = 160;
const OPEN_DISTANCE = BRICK_WIDTH;
const ROW_1_TOP = 20;
const ROW_2_TOP = ROW_1_TOP + BRICK_HEIGHT;
const ROW_3_TOP = ROW_2_TOP + BRICK_HEIGHT;
const ROW_4_TOP = ROW_3_TOP + BRICK_HEIGHT;

const BRICK_ROWS: BrickRow[] = [
  {
    index: 0,
    lefts: [-670, -330, 10, 350, 690, 1030, 1370],
    top: ROW_1_TOP,
  },
  {
    index: 1,
    lefts: [-500, -160, 180, 520, 860, 1200],
    top: ROW_2_TOP,
  },
  {
    index: 2,
    lefts: [-500, -160, 180, 520, 860, 1200],
    top: ROW_3_TOP,
  },
  {
    index: 3,
    lefts: [-670, -330, 10, 350, 690, 1030, 1370],
    top: ROW_4_TOP,
  },
];

const PRINCIPLES: PrincipleBrick[] = [
  {
    badgeClass: 'bg-amanah-mint text-white',
    box: createBrickBox(350, ROW_1_TOP),
    description: 'Pelayanan hangat dan tulus dengan senyuman sepenuh hati.',
    icon: <PixelHeartIcon />,
    id: 'ramah',
    imageSrc: '/assets/images/about-blocks/about-us-ramah.jpg',
    revealDirection: 1,
    ringClass: 'ring-amanah-mint/40',
    row: 0,
    title: 'Ramah',
  },
  {
    badgeClass: 'bg-amanah-blue text-white',
    box: createBrickBox(180, ROW_2_TOP),
    description: 'Ditangani dokter dan tenaga medis berlisensi serta berpengalaman.',
    icon: <PixelShieldIcon />,
    id: 'profesional',
    imageSrc: '/assets/images/about-blocks/about-us-professionl.jpg',
    revealDirection: -1,
    ringClass: 'ring-amanah-blue/40',
    row: 1,
    title: 'Profesional',
  },
  {
    badgeClass: 'bg-amanah-sky text-white',
    box: createBrickBox(520, ROW_2_TOP),
    description: 'Penanganan sigap, sistematis, dan efisien tanpa antre lama.',
    icon: <PixelBoltIcon />,
    id: 'cepat',
    imageSrc: '/assets/images/about-blocks/about-us-cepat.jpg',
    revealDirection: 1,
    ringClass: 'ring-amanah-sky/40',
    row: 1,
    title: 'Cepat',
  },
  {
    badgeClass: 'bg-amanah-mint text-white',
    box: createBrickBox(180, ROW_3_TOP),
    description: 'Standar medis higienis, steril, aman, dan nyaman untuk pasien.',
    icon: <PixelShieldSecurityIcon />,
    id: 'aman',
    imageSrc: '/assets/images/about-blocks/about-us-aman.jpg',
    revealDirection: -1,
    ringClass: 'ring-amanah-mint/40',
    row: 2,
    title: 'Aman',
  },
  {
    badgeClass: 'bg-amanah-blue text-white',
    box: createBrickBox(520, ROW_3_TOP),
    description: 'Pelayanan jujur, transparan, teruji, dan bertanggung jawab.',
    icon: <PixelCheckIcon />,
    id: 'terpercaya',
    imageSrc: '/assets/images/about-blocks/about-us-terpercaya.jpg',
    revealDirection: 1,
    ringClass: 'ring-amanah-blue/40',
    row: 2,
    title: 'Terpercaya',
  },
  {
    badgeClass: 'bg-amanah-sky text-white',
    box: createBrickBox(350, ROW_4_TOP),
    description: 'Mendengarkan dan merawat kebutuhan setiap pasien secara personal.',
    icon: <PixelCareIcon />,
    id: 'peduli',
    imageSrc: '/assets/images/about-blocks/about-us-perduli.jpg',
    revealDirection: 1,
    ringClass: 'ring-amanah-sky/40',
    row: 3,
    title: 'Peduli',
  },
];

const PRINCIPLES_BY_ID = PRINCIPLES.reduce<Record<PrincipleId, PrincipleBrick>>(
  (principles, principle) => {
    principles[principle.id] = principle;
    return principles;
  },
  {} as Record<PrincipleId, PrincipleBrick>,
);

const PRINCIPLE_ID_BY_POSITION = new Map(
  PRINCIPLES.map(principle => [getPositionKey(principle.row, principle.box.left), principle.id]),
);

const WALL_CELLS = BRICK_ROWS.flatMap(row =>
  row.lefts.map(left => ({
    box: createBrickBox(left, row.top),
    key: getPositionKey(row.index, left),
    principleId: PRINCIPLE_ID_BY_POSITION.get(getPositionKey(row.index, left)),
    row: row.index,
  })),
);

type StackedBlocksSectionProps = {
  className?: string;
};

export function StackedBlocksSection({ className }: StackedBlocksSectionProps) {
  const [hoveredCard, setHoveredCard] = useState<PrincipleId | null>(null);
  const activePrinciple = hoveredCard ? PRINCIPLES_BY_ID[hoveredCard] : null;

  return (
    <section
      aria-label="Prinsip klinik amanah healthcare"
      className={cn(
        `
          relative w-full overflow-hidden bg-background py-20 text-foreground
          select-none
          sm:py-28
        `,
        className,
      )}
    >
      <div
        className="
          pointer-events-none absolute inset-0 hidden items-center
          justify-center opacity-40
          dark:flex
        "
        aria-hidden="true"
      >
        <div className="
          h-[520px] w-[820px] rounded-full bg-amanah-blue/15 blur-[150px]
        "
        />
        <div className="
          h-[400px] w-[600px] -translate-y-20 rounded-full bg-amanah-sky/10
          blur-[130px]
        "
        />
      </div>

      <div className="
        relative mx-auto mb-12 max-w-4xl px-4 text-center
        sm:mb-16
      "
      >
        <h2 className="
          text-3xl font-medium tracking-tight text-foreground
          sm:text-4xl
          md:text-5xl
        "
        >
          Prinsip klinik amanah healthcare
        </h2>
      </div>

      <div
        className="
            relative mx-auto flex h-[360px] w-full max-w-[1360px] items-center
          justify-center px-4
          sm:h-[520px]
          md:h-[620px]
          lg:h-[720px]
          xl:h-[780px]
          2xl:h-[820px]
        "
      >
        <div
          className="
              relative h-[720px] w-[1040px] shrink-0 origin-center scale-[0.42]
            transition-transform duration-300
            sm:scale-[0.64]
            md:scale-[0.78]
            lg:scale-[0.98]
            xl:scale-[1.10]
            2xl:scale-[1.18]
          "
          style={getBoxStyle(STAGE_BOX)}
        >
          {PRINCIPLES.map(principle => (
            <PrincipleImagePreview
              key={`image-${principle.id}`}
              isHovered={hoveredCard === principle.id}
              onHoverEnd={() => setHoveredCard(null)}
              onHoverStart={() => setHoveredCard(principle.id)}
              principle={principle}
            />
          ))}

          {WALL_CELLS.map(cell => (
            <BrickWallCell
              activePrinciple={activePrinciple}
              cell={cell}
              key={cell.key}
              onHoverEnd={() => setHoveredCard(null)}
              onHoverStart={setHoveredCard}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function BrickWallCell({
  activePrinciple,
  cell,
  onHoverEnd,
  onHoverStart,
}: {
  activePrinciple: PrincipleBrick | null;
  cell: BrickCell;
  onHoverEnd: () => void;
  onHoverStart: (id: PrincipleId) => void;
}) {
  const offsetX = getCellOffsetX(cell, activePrinciple);

  if (!cell.principleId) {
    return <PlaceholderBrick box={cell.box} offsetX={offsetX} />;
  }

  const principle = PRINCIPLES_BY_ID[cell.principleId];

  return (
    <PrincipleCard
      isHovered={activePrinciple?.id === principle.id}
      offsetX={offsetX}
      onHoverEnd={onHoverEnd}
      onHoverStart={() => onHoverStart(principle.id)}
      principle={principle}
    />
  );
}

function PlaceholderBrick({ box, offsetX }: { box: AbsoluteBox; offsetX: number }) {
  return (
    <div
      aria-hidden="true"
      className="
        absolute z-20 rounded-none border border-border bg-card
        transition-transform duration-300 ease-out
      "
      style={getTranslatedBoxStyle(box, offsetX)}
    />
  );
}

function PrincipleImagePreview({
  isHovered,
  onHoverEnd,
  onHoverStart,
  principle,
}: {
  isHovered: boolean;
  onHoverEnd: () => void;
  onHoverStart: () => void;
  principle: PrincipleBrick;
}) {
  return (
    <div
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className={cn(
        `
          absolute z-10 overflow-hidden rounded-none border border-border
          bg-card transition-opacity duration-200
        `,
        isHovered
          ? cn('opacity-100 ring-1', principle.ringClass)
          : `pointer-events-none opacity-0`,
      )}
      style={getBoxStyle(principle.box)}
      aria-hidden="true"
    >
      <Image
        src={principle.imageSrc}
        alt=""
        fill
        sizes="340px"
        className="object-cover object-center brightness-95 contrast-105"
      />
      <div className="
        absolute inset-0 bg-linear-to-t from-background/80 via-background/20
        to-transparent
      "
      />
    </div>
  );
}

function PrincipleCard({
  isHovered,
  offsetX,
  onHoverEnd,
  onHoverStart,
  principle,
}: {
  isHovered: boolean;
  offsetX: number;
  onHoverEnd: () => void;
  onHoverStart: () => void;
  principle: PrincipleBrick;
}) {
  return (
    <div
      onBlur={onHoverEnd}
      onFocus={onHoverStart}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      tabIndex={0}
      className={cn(
        `
          absolute z-20 flex cursor-pointer flex-col justify-between
          rounded-none border border-border bg-card p-6 transition-all
          duration-300 ease-out
          focus-visible:ring-1 focus-visible:ring-ring
          focus-visible:outline-none
        `,
        isHovered && cn('z-30 border-primary/50 bg-card ring-1', principle.ringClass),
      )}
      style={getTranslatedBoxStyle(principle.box, offsetX)}
    >
      <PixelBadge bgClass={principle.badgeClass}>
        {principle.icon}
      </PixelBadge>

      <div>
        <h3 className="text-xl font-medium tracking-tight text-card-foreground">
          {principle.title}
        </h3>
        <p className="mt-1.5 text-xs/relaxed text-muted-foreground">
          {principle.description}
        </p>
      </div>
    </div>
  );
}

function PixelBadge({ bgClass, children }: { bgClass: string; children: ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'flex size-7 items-center justify-center rounded-none select-none',
        bgClass,
      )}
    >
      {children}
    </div>
  );
}

function PixelHeartIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 7 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="[image-rendering:pixelated]"
    >
      <rect x="1" y="1" width="2" height="1" fill="white" />
      <rect x="4" y="1" width="2" height="1" fill="white" />
      <rect x="0" y="2" width="7" height="2" fill="white" />
      <rect x="1" y="4" width="5" height="1" fill="white" />
      <rect x="2" y="5" width="3" height="1" fill="white" />
      <rect x="3" y="6" width="1" height="1" fill="white" />
    </svg>
  );
}

function PixelShieldIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 7 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-amanah-blue [image-rendering:pixelated]"
    >
      <rect x="1" y="1" width="5" height="4" fill="white" />
      <rect x="2" y="5" width="3" height="1" fill="white" />
      <rect x="3" y="6" width="1" height="1" fill="white" />
      <rect x="3" y="2" width="1" height="2" fill="currentColor" />
      <rect x="2" y="2" width="3" height="1" fill="currentColor" />
    </svg>
  );
}

function PixelBoltIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 7 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="[image-rendering:pixelated]"
    >
      <rect x="3" y="0" width="2" height="2" fill="white" />
      <rect x="2" y="2" width="3" height="1" fill="white" />
      <rect x="1" y="3" width="5" height="1" fill="white" />
      <rect x="2" y="4" width="2" height="1" fill="white" />
      <rect x="1" y="5" width="2" height="1" fill="white" />
      <rect x="1" y="6" width="1" height="1" fill="white" />
    </svg>
  );
}

function PixelShieldSecurityIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 7 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-amanah-mint [image-rendering:pixelated]"
    >
      <rect x="2" y="1" width="3" height="2" fill="white" />
      <rect x="3" y="2" width="1" height="1" fill="currentColor" />
      <rect x="1" y="3" width="5" height="3" fill="white" />
      <rect x="3" y="4" width="1" height="1" fill="currentColor" />
    </svg>
  );
}

function PixelCheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 7 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="[image-rendering:pixelated]"
    >
      <rect x="5" y="1" width="1" height="2" fill="white" />
      <rect x="4" y="3" width="1" height="2" fill="white" />
      <rect x="1" y="3" width="1" height="2" fill="white" />
      <rect x="2" y="4" width="1" height="2" fill="white" />
      <rect x="3" y="5" width="1" height="1" fill="white" />
    </svg>
  );
}

function PixelCareIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 7 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="[image-rendering:pixelated]"
    >
      <rect x="1" y="1" width="2" height="2" fill="white" />
      <rect x="4" y="1" width="2" height="2" fill="white" />
      <rect x="0" y="3" width="7" height="1" fill="white" />
      <rect x="1" y="4" width="5" height="1" fill="white" />
      <rect x="2" y="5" width="3" height="1" fill="white" />
      <rect x="3" y="6" width="1" height="1" fill="white" />
    </svg>
  );
}

function createBrickBox(left: number, top: number): AbsoluteBox {
  return {
    height: BRICK_HEIGHT,
    left,
    top,
    width: BRICK_WIDTH,
  };
}

function getPositionKey(row: number, left: number): string {
  return `${row}:${left}`;
}

function getCellOffsetX(cell: BrickCell, activePrinciple: PrincipleBrick | null): number {
  if (!activePrinciple || cell.row !== activePrinciple.row) {
    return 0;
  }

  if (cell.principleId === activePrinciple.id) {
    return activePrinciple.revealDirection * OPEN_DISTANCE;
  }

  if (activePrinciple.revealDirection === 1 && cell.box.left > activePrinciple.box.left) {
    return OPEN_DISTANCE;
  }

  if (activePrinciple.revealDirection === -1 && cell.box.left < activePrinciple.box.left) {
    return -OPEN_DISTANCE;
  }

  return 0;
}

function getBoxStyle(box: AbsoluteBox): CSSProperties {
  return {
    height: box.height,
    left: box.left,
    top: box.top,
    width: box.width,
  };
}

function getTranslatedBoxStyle(box: AbsoluteBox, offsetX: number): CSSProperties {
  return {
    ...getBoxStyle(box),
    transform: `translate3d(${offsetX}px, 0, 0)`,
  };
}
