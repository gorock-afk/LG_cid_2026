/* ============================================================================
   showcase.js — 15 Bespoke Full-Stage Live Task Showcases (1-Shot Non-Looping)
   Each <canvas data-show="KEY"> renders a distinct, task-authentic visual on a
   1400x560 artboard (uniformly scaled, HiDPI). Plays once cleanly to D seconds
   and holds steady; pressing R calls window.showReplay() to replay from t = 0.
   ============================================================================ */
(function () {
  const AW = 1400, AH = 560;
  const FONT = '"Pretendard","Plus Jakarta Sans",-apple-system,"Segoe UI","Malgun Gothic",sans-serif';
  const MONO = '"JetBrains Mono","D2Coding",Menlo,Consolas,monospace';
  const C = {
    navy: '#174EA6', blue: '#1A73E8', soft: '#E8F0FE',
    ink: '#111827', sub: '#374151', mute: '#6B7280',
    line: '#E5E7EB', border: '#CBD5E1', bg: '#F9FAFB', card: '#F3F4F6',
    green: '#0D652D', greenS: '#E6F4EA', greenB: '#A7D7B5',
    red: '#DC2626', redDark: '#A50E0E', redS: '#FCE8E6', redB: '#FCA5A5',
    amber: '#B06000', amberS: '#FEF7E0', amberB: '#FCD34D'
  };

  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const ph = (t, a, b) => clamp((t - a) / (b - a));
  const ease = p => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
  const lerp = (a, b, p) => a + (b - a) * p;

  function rr(ctx, x, y, w, h, r) {
    ctx.beginPath();
    if (r && ctx.roundRect) ctx.roundRect(x, y, w, h, r);
    else ctx.rect(x, y, w, h);
  }
  function box(ctx, x, y, w, h, fill, stroke, r = 0, lw = 1.5) {
    rr(ctx, x, y, w, h, r);
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
  }
  function T(ctx, s, x, y, size, color, weight = 700, align = 'left', font = FONT) {
    ctx.font = `${weight} ${size}px ${font}`;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(s, x, y);
  }
  function tw(ctx, s, size, weight = 700, font = FONT) {
    ctx.font = `${weight} ${size}px ${font}`;
    return ctx.measureText(s).width;
  }
  function pill(ctx, x, y, text, fill, fg, size = 14, h = 28) {
    const w = tw(ctx, text, size, 800) + 24;
    box(ctx, x, y, w, h, fill, null, h / 2);
    T(ctx, text, x + 12, y + h * 0.68, size, fg, 800);
    return w;
  }
  function chips(ctx, labels, idx, x = 0, y = 2) {
    let cx = x;
    labels.forEach((lab, i) => {
      const done = i < idx, act = i === idx;
      const s = `${done ? '✓ ' : (i + 1) + '  '}${lab}`;
      const w = tw(ctx, s, 15, 800) + 28;
      box(ctx, cx, y, w, 32, done ? C.greenS : act ? C.navy : C.card, done ? C.greenB : act ? C.navy : C.line, 16);
      T(ctx, s, cx + 14, y + 22, 15, done ? C.green : act ? '#FFFFFF' : C.mute, 800);
      cx += w + 8;
      if (i < labels.length - 1) {
        T(ctx, '›', cx, y + 22, 17, '#9CA3AF', 800);
        cx += 13;
      }
    });
  }
  function callout(ctx, x, y, w, h, title, sub, kind = 'green', alpha = 1) {
    ctx.save();
    ctx.globalAlpha = alpha;
    const col = kind === 'green' ? C.green : kind === 'red' ? C.red : C.navy;
    box(ctx, x, y, w, h, '#FFFFFF', col, 0, 2);
    box(ctx, x, y, 7, h, col, null, 0);
    T(ctx, title, x + 24, y + (sub ? 36 : h * 0.62), 22, col, 900);
    if (sub) T(ctx, sub, x + 24, y + 65, 15.5, C.sub, 700);
    ctx.restore();
  }
  function winFrame(ctx, x, y, w, h, title, dark = false) {
    ctx.save();
    ctx.shadowColor = 'rgba(15,23,42,0.12)';
    ctx.shadowBlur = 14;
    ctx.shadowOffsetY = 4;
    box(ctx, x, y, w, h, dark ? '#0F172A' : '#FFFFFF', null, 6);
    ctx.restore();
    box(ctx, x, y, w, h, null, dark ? '#1E293B' : C.border, 6, 1.2);
    ctx.save();
    rr(ctx, x, y, w, 34, [6, 6, 0, 0]);
    ctx.fillStyle = dark ? '#1E293B' : '#F1F5F9';
    ctx.fill();
    ctx.restore();
    T(ctx, title, x + 14, y + 22, 13.5, dark ? '#CBD5E1' : C.sub, 700);
    const cy = y + 22, col = dark ? '#94A3B8' : '#475569';
    T(ctx, '─', x + w - 84, cy, 13, col, 700);
    T(ctx, '□', x + w - 54, cy, 14, col, 700);
    T(ctx, '✕', x + w - 24, cy, 13, col, 700);
  }
  function arrow(ctx, x1, y1, x2, y2, col, lw = 2.2) {
    ctx.save();
    ctx.strokeStyle = col;
    ctx.fillStyle = col;
    ctx.lineWidth = lw;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    const a = Math.atan2(y2 - y1, x2 - x1), hl = 8;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - hl * Math.cos(a - 0.45), y2 - hl * Math.sin(a - 0.45));
    ctx.lineTo(x2 - hl * Math.cos(a + 0.45), y2 - hl * Math.sin(a + 0.45));
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // ==========================================================================
  // 01. AA Index v5.0 — 9-Eval Nonagon Radar + Official 4-Pillar 3x3 Grid
  // ==========================================================================
  const AA_SUBJ = [
    ['AA-Briefcase', '실무 보고서·발표 작성', '지식실무', 52, 83, 95],
    ['AutomationBench', '다중 앱 업무 자동화', '지식실무', 48, 84, 94],
    ['GDP.pdf', '복합 PDF 표·도면 해독', '지식실무', 56, 86, 97],
    ['FrontierCode 2.0', '멀티파일 소프트웨어 개발', '코딩', 47, 83, 96],
    ['Terminal-Bench 4.0', '리눅스 서버 터미널 복구', '코딩', 49, 82, 95],
    ['TB-Science 0.1', '과학 시뮬레이션 보정', '과학', 45, 79, 93],
    ['CritPt v2', '대학원 물리 심층 난제', '과학', 43, 78, 92],
    ['AA-Omniscience', '전문지식 · 환각 억제', '추론', 54, 85, 96],
    ['HLE-Diamond', '인류 최후의 시험 최고난도', '추론', 44, 80, 94]
  ];
  function drawAA(ctx, t) {
    const solved = Math.min(9, Math.floor(ph(t, 0.4, 7.2) * 9.99));
    const stage = t > 8.0 ? 4 : solved >= 7 ? 2 : solved >= 3 ? 1 : 0;
    chips(ctx, ['4대 영역 9개 공식 시험 응시', '문항별 심층 추론', '전 영역 편차 검증', '종합 59점 달성 (1위)'], stage);

    // Left: 9-Axis Nonagon Radar Chart (Flash -> Argon -> Carbon)
    const lx = 0, ly = 48, lw = 530, lh = 504;
    box(ctx, lx, ly, lw, lh, C.bg, C.line, 0);
    box(ctx, lx, ly, lw, 42, C.soft, C.line, 0);
    T(ctx, '4대 영역 · 9개 공식 평가 밸런스 레이더', lx + 18, ly + 27, 16, C.navy, 800);

    const cx = lx + 265, cy = ly + 268, R = 118;
    for (let ring = 1; ring <= 4; ring++) {
      ctx.beginPath();
      for (let i = 0; i < 9; i++) {
        const a = -Math.PI / 2 + (i * Math.PI * 2) / 9;
        const rr_ = (R * ring) / 4;
        const px = cx + Math.cos(a) * rr_, py = cy + Math.sin(a) * rr_;
        i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = ring === 4 ? '#CBD5E1' : '#E5E7EB';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    for (let i = 0; i < 9; i++) {
      const a = -Math.PI / 2 + (i * Math.PI * 2) / 9;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
      ctx.strokeStyle = '#E5E7EB';
      ctx.stroke();
      const ca = Math.cos(a), sa = Math.sin(a);
      const align = Math.abs(ca) < 0.22 ? 'center' : ca > 0 ? 'left' : 'right';
      const lx_ = cx + ca * (R + 14), ly_ = cy + sa * (R + 18);
      const done = i < solved;
      T(ctx, AA_SUBJ[i][0], lx_, ly_ + 4, 12, done ? C.ink : C.mute, done ? 800 : 600, align);
    }

    const drawPoly = (idxCol, stroke, fill, grow, lw_ = 2, dash = []) => {
      ctx.save();
      ctx.beginPath();
      ctx.setLineDash(dash);
      for (let i = 0; i < 9; i++) {
        const a = -Math.PI / 2 + (i * Math.PI * 2) / 9;
        const v = (AA_SUBJ[i][idxCol] / 100) * R * grow;
        const px = cx + Math.cos(a) * v, py = cy + Math.sin(a) * v;
        i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
      }
      ctx.closePath();
      if (fill) { ctx.fillStyle = fill; ctx.fill(); }
      ctx.strokeStyle = stroke;
      ctx.lineWidth = lw_;
      ctx.stroke();
      ctx.restore();
    };
    drawPoly(3, '#94A3B8', 'rgba(148,163,184,0.10)', ease(ph(t, 0.2, 1.4)), 1.8, [4, 3]);
    drawPoly(4, '#60A5FA', 'rgba(96,165,250,0.14)', ease(ph(t, 0.8, 2.4)), 2.2);
    const gCarbon = ease(ph(t, 1.4, 7.2));
    drawPoly(5, C.navy, 'rgba(23,78,166,0.20)', gCarbon, 3.2);

    // Legend at bottom of Radar
    const legY = ly + lh - 34;
    box(ctx, lx + 24, legY - 13, 14, 4, '#94A3B8'); T(ctx, '3.8 Flash (31점)', lx + 44, legY - 7, 13, C.mute, 700);
    box(ctx, lx + 186, legY - 13, 14, 4, '#60A5FA'); T(ctx, '4 Argon (50점)', lx + 206, legY - 7, 13, C.sub, 700);
    box(ctx, lx + 344, legY - 13, 16, 5, C.navy); T(ctx, '4 Carbon (59점 · 1위)', lx + 366, legY - 7, 13.5, C.navy, 900);

    // Right: 9 Official Exam Cards (3 cols x 3 rows)
    const rx = 554, ry = 48, rw = 846, rh = 504;
    box(ctx, rx, ry, rw, rh, '#FFFFFF', C.line, 0);
    box(ctx, rx, ry, rw, 42, C.card, C.line, 0);
    T(ctx, 'AA Index v5.0 공식 9개 세부 시험 채점판', rx + 18, ry + 27, 16, C.ink, 800);
    const curScore = Math.round(lerp(31, 59, gCarbon));
    T(ctx, `현재 종합 지수: ${curScore}점`, rx + rw - 20, ry + 27, 16, C.navy, 900, 'right');

    const cw = 260, ch = 116;
    AA_SUBJ.forEach(([name, desc, pillar, , , sc], i) => {
      const col = i % 3, row = Math.floor(i / 3);
      const x = rx + 18 + col * (cw + 15), y = ry + 56 + row * (ch + 14);
      const pCard = ph(t, 0.4 + i * 0.68, 1.05 + i * 0.68);
      const done = pCard >= 1;
      box(ctx, x, y, cw, ch, done ? '#F8FAFC' : '#FFFFFF', done ? C.navy : C.line, 0, done ? 1.8 : 1);
      pill(ctx, x + 12, y + 10, `${String(i + 1).padStart(2, '0')} · ${pillar}`, done ? C.soft : C.card, done ? C.navy : C.mute, 11.5, 22);
      T(ctx, done ? '✓ 통과' : (pCard > 0 ? '풀이 중…' : '대기'), x + cw - 12, y + 25, 12.5, done ? C.green : C.mute, 800, 'right');
      T(ctx, name, x + 12, y + 53, 14.2, C.ink, 900);
      T(ctx, desc, x + 12, y + 77, 13, C.sub, 600);
      box(ctx, x + 12, y + 95, cw - 24, 8, '#E5E7EB', null, 4);
      box(ctx, x + 12, y + 95, (cw - 24) * (sc / 100) * ease(pCard), 8, done ? C.navy : C.blue, null, 4);
    });

    if (t > 7.6) {
      box(ctx, rx + 18, ry + rh - 44, rw - 36, 34, C.greenS, C.greenB, 0);
      T(ctx, '✓ 지식실무 · 코딩 · 과학 · 추론 9개 공식 시험 모두 상위권 → 종합 AA Index 59점 (1위)', rx + 30, ry + rh - 21, 14.5, C.green, 800);
    }
  }

  // ==========================================================================
  // 02. Vals Index v2.2 — Side-by-Side PDF & Contract Redline Audit Desk
  // ==========================================================================
  function drawVals(ctx, t) {
    const st = t > 8.6 ? 4 : t > 5.8 ? 2 : t > 2.6 ? 1 : 0;
    chips(ctx, ['분기보고서 숫자 대조', '계약서 별첨 독소조항 적출', '조세조약 세액 산출', '검토 리포트 완성'], st);

    // Doc 1: 200p Financial Report PDF
    const x1 = 0, y1 = 48, w1 = 470, h1 = 504;
    winFrame(ctx, x1, y1, w1, h1, '2026_3Q_연결분기보고서.pdf (총 214쪽)');
    // Page 12 Summary
    box(ctx, x1 + 16, y1 + 48, w1 - 32, 188, '#F8FAFC', C.border, 0);
    pill(ctx, x1 + 28, y1 + 60, '12쪽 · 요약 연결손익계산서', C.soft, C.navy, 12.5, 24);
    [['연결 매출액', '28,450억 원'], ['연결 영업이익', '4,120억 원'], ['당기순이익', '3,090억 원']].forEach(([k, v], i) => {
      const ry = y1 + 106 + i * 40;
      box(ctx, x1 + 28, ry, w1 - 56, 34, i === 1 && t > 1.6 ? '#FEF2F2' : '#FFFFFF', i === 1 && t > 1.6 ? C.red : C.line, 0, i === 1 && t > 1.6 ? 2 : 1);
      T(ctx, k, x1 + 40, ry + 23, 14.5, C.sub, 700);
      T(ctx, v, x1 + w1 - 42, ry + 23, 15, i === 1 && t > 1.6 ? C.red : C.ink, 800, 'right');
    });

    // Page 194 Footnote 14
    box(ctx, x1 + 16, y1 + 266, w1 - 32, 220, '#F8FAFC', C.border, 0);
    pill(ctx, x1 + 28, y1 + 278, '194쪽 · 주석 14호 지역별 영업이익 세부표', C.card, C.ink, 12.5, 24);
    [['국내 사업부문', '2,690억 원'], ['유럽 · 북미 법인', '1,430억 원'], ['해외 대손상각 차감', '-12억 원'], ['주석 세부 합계', '4,108억 원']].forEach(([k, v], i) => {
      const ry = y1 + 316 + i * 38;
      const hi = i >= 2 && t > 2.4;
      box(ctx, x1 + 28, ry, w1 - 56, 32, hi ? '#FEF2F2' : '#FFFFFF', hi ? C.red : C.line, 0, hi ? 1.8 : 1);
      T(ctx, k, x1 + 40, ry + 22, 14, C.sub, 700);
      T(ctx, v, x1 + w1 - 42, ry + 22, 14.5, hi ? C.red : C.ink, 800, 'right');
    });

    // Red Discrepancy Bridge connecting p.12 (4,120) and p.194 (4,108)
    if (t > 2.6) {
      const pBr = ease(ph(t, 2.6, 3.4));
      ctx.save();
      ctx.globalAlpha = pBr;
      ctx.strokeStyle = C.red;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x1 + w1 - 24, y1 + 163);
      ctx.bezierCurveTo(x1 + w1 + 18, y1 + 220, x1 + w1 + 18, y1 + 380, x1 + w1 - 24, y1 + 446);
      ctx.stroke();
      box(ctx, x1 + 128, y1 + 236, 224, 30, C.red, null, 15);
      T(ctx, '⚠ 앞뒤 표 -12억 원 불일치!', x1 + 240, y1 + 256, 13.5, '#FFFFFF', 900, 'center');
      ctx.restore();
    }

    // Doc 2: Supply Contract DOCX with Animated Highlighter
    const x2 = 492, y2 = 48, w2 = 468, h2 = 504;
    winFrame(ctx, x2, y2, w2, h2, '부품공급_기본계약서_및_별첨B.docx');
    box(ctx, x2 + 16, y2 + 48, w2 - 32, 156, '#FFFFFF', C.line, 0);
    pill(ctx, x2 + 28, y2 + 60, '본문 제8조 (손해배상 책임 상한)', C.soft, C.navy, 12.5, 24);
    T(ctx, '"납품 지연 등 본 계약과 관련한 매도인의 총 배상 책임은', x2 + 28, y2 + 114, 14.5, C.sub, 600);
    T(ctx, ' 어떠한 경우에도 해당 발주 금액의 100%를 초과하지 않는다."', x2 + 28, y2 + 140, 14.5, C.ink, 800);
    T(ctx, '→ 본문만 읽으면 안전해 보임', x2 + 28, y2 + 178, 13.5, C.mute, 700);

    box(ctx, x2 + 16, y2 + 224, w2 - 32, 262, '#FFFBEB', t > 5.0 ? C.red : C.amberB, 0, t > 5.0 ? 2.2 : 1.2);
    pill(ctx, x2 + 28, y2 + 238, '별첨 B 특약사항 제3항 (207쪽 하단)', C.amberS, C.amber, 12.5, 24);
    T(ctx, '"본문 제8조에도 불구하고, 부품 결함으로 인한 발주사의', x2 + 28, y2 + 292, 14.5, C.sub, 600);

    // Animated yellow/red highlighter sweep
    const hlW = (w2 - 58) * ease(ph(t, 4.4, 5.6));
    if (hlW > 2) {
      box(ctx, x2 + 26, y2 + 306, hlW, 30, '#FEF08A', null, 0);
      box(ctx, x2 + 26, y2 + 340, hlW * 0.85, 30, '#FEE2E2', null, 0);
    }
    T(ctx, ' 생산 라인 휴지 손실 및 간접손해는 배상 상한 예외로 하며', x2 + 28, y2 + 327, 15, C.ink, 900);
    T(ctx, ' 실손해 전액(무제한)을 배상한다."', x2 + 28, y2 + 361, 15.5, C.red, 900);

    if (t > 5.6) {
      const a = ph(t, 5.6, 6.2);
      ctx.save();
      ctx.globalAlpha = a;
      box(ctx, x2 + 28, y2 + 398, w2 - 56, 66, '#FFFFFF', C.red, 0, 2);
      T(ctx, '⚠ 숨은 독소조항 적출 완료', x2 + 44, y2 + 425, 15.5, C.red, 900);
      T(ctx, '본문 100% 상한 무력화 → 별첨 제3항 삭제 권고안 생성', x2 + 44, y2 + 449, 13.5, C.sub, 700);
      ctx.restore();
    }

    // Right Column: Tax & Final Audit Summary
    const x3 = 982, y3 = 48, w3 = 418, h3 = 504;
    box(ctx, x3, y3, w3, h3, '#FFFFFF', C.line, 0);
    box(ctx, x3, y3, w3, 42, C.navy, null, 0);
    T(ctx, 'Carbon 실무 검토 예시 (Vals 8종 종합)', x3 + 18, y3 + 27, 16, '#FFFFFF', 800);

    const cards = [
      ['1. 재무제표 검산', '요약표(4,120억) ≠ 주석(4,108억)', '해외 대손상각 12억 누락 확인', 2.8, 'red'],
      ['2. 계약 리스크 검토', '본문 제8조 ↔ 별첨 B 제3항 충돌', '라인 정지 무제한 배상 조항 적출', 5.8, 'red'],
      ['3. 세무 · 공제 산출', '해외 로열티 85억 제한세율 10% 적용', '원천징수 8.5억 · R&D 세액공제 확정', 7.6, 'green']
    ];
    cards.forEach(([title, l1, l2, trig, kind], i) => {
      const cy = y3 + 58 + i * 114, on = t >= trig;
      const bg = !on ? C.bg : (kind === 'red' ? '#FEF2F2' : C.greenS);
      const bd = !on ? C.line : (kind === 'red' ? C.redB : C.greenB);
      box(ctx, x3 + 16, cy, w3 - 32, 100, bg, bd, 0, 1.5);
      T(ctx, (on ? '✓ ' : '· ') + title, x3 + 30, cy + 28, 15.5, on ? (kind === 'red' ? C.redDark : C.green) : C.mute, 900);
      T(ctx, on ? l1 : '문서 조항 스캔 대기…', x3 + 30, cy + 56, 14, on ? C.ink : C.mute, 700);
      if (on) T(ctx, l2, x3 + 30, cy + 80, 13.5, C.sub, 600);
    });

    if (t > 8.6) {
      callout(ctx, x3 + 16, y3 + 404, w3 - 32, 84, '✓ 대표 실무 검토 예시 완료', '8개 재무 · 법무 · 세무 · 코딩 종합 70.4% (1위)', 'green', ph(t, 8.6, 9.2));
    }
  }

  // ==========================================================================
  // 03. SWE-sweep — Dark Multi-File IDE + Synchronized Git Diff + Pytest Bar
  // ==========================================================================
  const SWE_TREE = [
    ['api/order_checkout.py', true, 1.2],
    ['api/health_probe.py', false, 0],
    ['pricing/bulk_discount.py', true, 2.2],
    ['pricing/promo_banner.py', false, 0],
    ['utils/currency_round.py', true, 3.2],
    ['utils/string_fmt.py', false, 0],
    ['tax/vat_calculator.py', true, 4.2],
    ['db/ledger_commit.py', true, 5.2],
    ['workers/email_notify.py', false, 0]
  ];
  function drawSWE(ctx, t) {
    const st = t > 9.2 ? 4 : t > 7.2 ? 3 : t > 4.2 ? 2 : t > 1.0 ? 1 : 0;
    chips(ctx, ['2,400개 파일 탐색', '얽힌 5개 모듈 특정', '동시 코드 패치(Diff)', '통합 테스트 128개 통과'], st);

    const ix = 0, iy = 48, iw = 1400, ih = 504;
    winFrame(ctx, ix, iy, iw, ih, 'enterprise-erp-monorepo — Code Editor (2,400 files · 184,200 LOC)', true);

    // Left Explorer Tree
    const tx = ix + 12, ty = iy + 44, tw_ = 330, th_ = ih - 56;
    box(ctx, tx, ty, tw_, th_, '#111827', '#334155', 4, 1);
    T(ctx, 'EXPLORER · 2,400 FILES', tx + 14, ty + 26, 12.5, '#94A3B8', 800, 'left', MONO);
    const scanned = Math.min(2400, Math.round(ease(ph(t, 0.3, 3.8)) * 2400));
    T(ctx, `${scanned}/2400`, tx + tw_ - 14, ty + 26, 12.5, '#60A5FA', 800, 'right', MONO);

    SWE_TREE.forEach(([path, hit, trig], i) => {
      const ry = ty + 42 + i * 40;
      const active = hit && t >= trig;
      if (active) box(ctx, tx + 8, ry, tw_ - 16, 34, 'rgba(37,99,235,0.24)', '#3B82F6', 4, 1.2);
      T(ctx, (active ? '● ' : '  ') + path, tx + 16, ry + 22, 13.5, active ? '#93C5FD' : '#64748B', active ? 800 : 500, 'left', MONO);
      if (active && t > 5.8) T(ctx, 'PATCHED', tx + tw_ - 16, ry + 22, 11, '#4ADE80', 800, 'right', MONO);
    });
    box(ctx, tx + 10, ty + th_ - 46, tw_ - 20, 36, '#1E293B', null, 4);
    T(ctx, '힌트 없이 원인 파일 5개 스스로 추적', tx + 20, ty + th_ - 23, 13, '#E2E8F0', 700);

    // Right Top: Multi-File Unified Diff Panels
    const dx = tx + tw_ + 14, dy = ty, dw = iw - tw_ - 38, dh = 316;
    box(ctx, dx, dy, dw, dh, '#0B1120', '#334155', 4, 1);
    // Tabs
    ['1. bulk_discount.py', '2. currency_round.py', '3. vat_calculator.py (+2)'].forEach((tab, i) => {
      const on = t > 2.2 + i * 1.4;
      box(ctx, dx + 10 + i * 238, dy + 8, 230, 28, on ? '#1E293B' : '#0F172A', on ? '#3B82F6' : '#334155', 4, 1);
      T(ctx, tab, dx + 22 + i * 238, dy + 27, 13, on ? '#F8FAFC' : '#64748B', 700, 'left', MONO);
    });

    const diffs = [
      // File 1
      [3.0, '# pricing/bulk_discount.py — 대량 주문 할인율 부동소수점 오차 수정', '#94A3B8', null],
      [3.4, '- net = total * (1.0 - float(tier_rate))   # 1.00000002 -> 음수 발생!', '#FCA5A5', 'rgba(239,68,68,0.16)'],
      [4.0, '+ net = (Decimal(total) * (Decimal(1) - tier_rate)).quantize(KRW)', '#86EFAC', 'rgba(34,197,94,0.16)'],
      // File 2
      [4.8, '# utils/currency_round.py & tax/vat_calculator.py — 전역 반올림 오염 차단', '#94A3B8', null],
      [5.2, '- decimal.getcontext().rounding = ROUND_FLOOR  # 타 모듈 계산 오염!', '#FCA5A5', 'rgba(239,68,68,0.16)'],
      [5.8, '+ with decimal.localcontext(CTX_KRW_HALF_UP):  # 지역 컨텍스트 격리', '#86EFAC', 'rgba(34,197,94,0.16)'],
      [6.3, '+     vat = calc_vat_exact(net); ledger.commit_atomic(net, vat)', '#86EFAC', 'rgba(34,197,94,0.16)']
    ];
    diffs.forEach(([trig, code, col, bg], i) => {
      if (t < trig) return;
      const ly = dy + 50 + i * 36;
      const pLine = ph(t, trig, trig + 0.35);
      ctx.save();
      ctx.globalAlpha = pLine;
      if (bg) box(ctx, dx + 14, ly - 18, dw - 28, 30, bg, null, 3);
      T(ctx, code, dx + 24, ly + 2, 14, col, code.startsWith('+') ? 700 : 500, 'left', MONO);
      ctx.restore();
    });

    // Right Bottom: Integrated Test Suite Runner
    const ry = dy + dh + 12, rh = th_ - dh - 12;
    box(ctx, dx, ry, dw, rh, '#111827', '#334155', 4, 1);
    const pTest = ease(ph(t, 6.8, 9.2));
    const passed = Math.round(128 * pTest);
    const allOk = passed >= 128;
    T(ctx, '$ pytest tests/integration/checkout_tax_ledger_suite.py', dx + 18, ry + 30, 14, '#E2E8F0', 700, 'left', MONO);
    T(ctx, allOk ? '✓ 128 / 128 PASSED (부작용 0건)' : `Running... ${passed} / 128`, dx + dw - 20, ry + 30, 14.5, allOk ? '#4ADE80' : '#93C5FD', 800, 'right', MONO);

    box(ctx, dx + 18, ry + 48, dw - 36, 18, '#1E293B', null, 9);
    box(ctx, dx + 18, ry + 48, (dw - 36) * pTest, 18, allOk ? '#16A34A' : '#2563EB', null, 9);
    T(ctx, allOk ? '5개 연결 모듈 일괄 수리 완료 — 결제 0원 버그 해결 · 세금/원장 회귀 충돌 0건' : '파일 1개만 고쳤을 때 발생하는 하위 세금·원장 충돌까지 동시에 검증 중…', dx + 18, ry + 96, 14.5, allOk ? '#86EFAC' : '#94A3B8', 700);
  }

  // ==========================================================================
  // 04. Terminal-Bench 4.0 — Live Linux SSH Terminal + Server Health Monitor
  // ==========================================================================
  const TERM_LINES = [
    ['cmd', 'systemctl start shop-api'],
    ['err', 'Job for shop-api.service failed because the control process exited.'],
    ['cmd', 'journalctl -u shop-api -n 3'],
    ['err', 'shop-api[2231]: ImportError: libssl.so.1.1: cannot open shared object'],
    ['err', 'shop-api[2231]: Main process exited, status=1/FAILURE'],
    ['note', '# 원인 진단: OpenSSL 1.1 라이브러리 누락 + 설정 경로 불일치'],
    ['cmd', 'sudo apt-get install -y libssl1.1'],
    ['ok', 'Setting up libssl1.1:amd64 (1.1.1w) ... done'],
    ['cmd', "sed -i 's#/opt/ssl#/usr/lib/ssl#' /etc/shop-api.conf"],
    ['cmd', 'systemctl restart shop-api'],
    ['ok', '● shop-api.service - active (running) since 03:12:44'],
    ['cmd', 'curl -s localhost:8080/health'],
    ['ok', '{"status":"ok","endpoints":"142/142","latency_ms":12}']
  ];
  const TERM_TL = (() => {
    let t = 0.4;
    return TERM_LINES.map(([k, s]) => {
      const st = t;
      const dur = k === 'cmd' ? s.length / 36 : 0.05;
      t += dur + (k === 'cmd' ? 0.36 : 0.44);
      return { k, s, st, dur };
    });
  })();
  function drawTerm(ctx, t) {
    const lineDone = i => t >= TERM_TL[i].st + TERM_TL[i].dur;
    const stage = lineDone(12) ? 5 : lineDone(9) ? 4 : lineDone(8) ? 3 : lineDone(5) ? 2 : lineDone(3) ? 1 : 0;
    chips(ctx, ['장애 확인', '에러 로그 역추적', '원인 파악', '패키지 · 설정 패치', '정상 가동 확인'], stage);

    const x = 0, y = 48, w = 930, h = 504;
    winFrame(ctx, x, y, w, h, 'root@prod-server-01: ~   (Linux SSH Terminal)', true);
    let ly = y + 68;
    for (const L of TERM_TL) {
      if (t < L.st) break;
      const shown = L.k === 'cmd' ? L.s.slice(0, Math.floor((t - L.st) * 36)) : L.s;
      if (L.k === 'cmd') {
        T(ctx, 'root@server-01:~$', x + 20, ly, 15.5, '#4ADE80', 700, 'left', MONO);
        T(ctx, shown, x + 194, ly, 16, '#F8FAFC', 700, 'left', MONO);
        if (t < L.st + L.dur + 0.35 && Math.floor(t * 4) % 2 === 0) {
          const cw = tw(ctx, shown, 16, 700, MONO);
          ctx.fillStyle = '#F8FAFC';
          ctx.fillRect(x + 196 + cw, ly - 15, 9, 18);
        }
      } else {
        const col = L.k === 'err' ? '#FCA5A5' : L.k === 'ok' ? '#86EFAC' : '#93C5FD';
        T(ctx, shown, x + 20, ly, 15.5, col, L.k === 'note' ? 800 : 600, 'left', L.k === 'note' ? FONT : MONO);
      }
      ly += 32;
    }

    const px = 956, pw = 444;
    box(ctx, px, y, pw, h, '#FFFFFF', C.line, 0);
    T(ctx, '실시간 서버 상태 모니터', px + 24, y + 40, 17, C.mute, 800);
    const up = lineDone(10);
    const pulse = up ? 0 : (0.5 + 0.5 * Math.sin(t * 5));
    ctx.save();
    ctx.beginPath();
    ctx.arc(px + 72, y + 108, 30 + pulse * 6, 0, Math.PI * 2);
    ctx.fillStyle = up ? 'rgba(13,101,45,0.15)' : 'rgba(220,38,38,0.15)';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(px + 72, y + 108, 22, 0, Math.PI * 2);
    ctx.fillStyle = up ? '#16A34A' : C.red;
    ctx.fill();
    ctx.restore();
    T(ctx, 'shop-api.service', px + 118, y + 101, 20, C.ink, 900);
    T(ctx, up ? 'RUNNING · 정상 가동 (12ms)' : 'DOWN · 기동 실패 (502)', px + 118, y + 130, 17.5, up ? C.green : C.red, 900);

    const items = [
      ['시스템 로그에서 에러 위치 확인', 4],
      ['원인: OpenSSL 라이브러리 · 경로 불일치', 5],
      ['패키지 설치 및 설정 파일 직접 수정', 8],
      ['데몬 재시작 (active running)', 10],
      ['헬스체크 142개 엔드포인트 200 OK', 12]
    ];
    items.forEach(([s, ev], i) => {
      const yy = y + 172 + i * 54, ok = lineDone(ev);
      box(ctx, px + 20, yy, pw - 40, 44, ok ? C.greenS : C.bg, ok ? C.greenB : C.line, 0);
      ctx.beginPath();
      ctx.arc(px + 44, yy + 22, 11, 0, Math.PI * 2);
      ctx.fillStyle = ok ? C.green : '#D1D5DB';
      ctx.fill();
      T(ctx, ok ? '✓' : String(i + 1), px + 44, yy + 27, 12.5, '#FFFFFF', 900, 'center');
      T(ctx, s, px + 66, yy + 28, 15.5, ok ? C.ink : C.mute, 800);
    });
    T(ctx, up ? '✓ 사람 개입 0회 · 무인 복구 완료' : '터미널 진단 진행 중…', px + 24, y + h - 22, 16, up ? C.green : C.mute, 900);
  }

  // ==========================================================================
  // 05. Agents' Last Exam v1.1 — Windows 11 Multi-App Desktop + Mouse Cursor
  // ==========================================================================
  const CUR = [
    [0, 680, 500], [1.0, 246, 368, 1], [2.0, 246, 368], [2.8, 412, 286, 1], [3.6, 412, 286],
    [4.8, 600, 256, 1], [6.4, 456, 264], [7.8, 980, 250], [10.8, 1288, 136, 1], [11.6, 1282, 174], [12.5, 1282, 174]
  ];
  function curAt(t) {
    for (let i = 0; i < CUR.length - 1; i++) {
      const a = CUR[i], b = CUR[i + 1];
      if (t <= b[0]) {
        const p = ease(ph(t, a[0], b[0]));
        return [lerp(a[1], b[1], p), lerp(a[2], b[2], p)];
      }
    }
    const L = CUR[CUR.length - 1];
    return [L[1], L[2]];
  }
  function drawDesktop(ctx, t) {
    const stage = t > 11.2 ? 5 : t > 7.6 ? 3 : t > 4.6 ? 2 : t > 2.6 ? 1 : 0;
    chips(ctx, ['포털 엑셀 다운로드', '돌발 팝업 닫기', '폴더 분류 이동', '시트 작성', '최종 제출'], stage);

    const dx = 0, dy = 48, dw = 1400, dh = 504;
    const g = ctx.createLinearGradient(0, dy, 0, dy + dh);
    g.addColorStop(0, '#E2EBF8');
    g.addColorStop(1, '#CBD9EE');
    box(ctx, dx, dy, dw, dh, g, C.border, 6, 1);
    box(ctx, dx, dy + dh - 40, dw, 40, 'rgba(255,255,255,0.9)', null, [0, 0, 6, 6]);
    ['#1A73E8', '#F59E0B', '#16A34A', '#475569'].forEach((c, i) => box(ctx, 642 + i * 32, dy + dh - 31, 22, 22, c, null, 4));
    T(ctx, '오전 9:12  ·  Windows 11 업무 PC', 1265, dy + dh - 15, 12.5, C.sub, 700, 'center');

    // Window 1: Chrome Portal
    const bx = 22, by = 68, bw = 492, bh = 412;
    winFrame(ctx, bx, by, bw, bh, '사내 구매·실적 포털 — Chrome');
    box(ctx, bx + 14, by + 42, bw - 28, 28, '#F1F5F9', null, 14);
    T(ctx, 'https://portal.enterprise.internal/report/monthly', bx + 28, by + 61, 12.5, C.sub, 600);
    T(ctx, '10월 부서별 실적 원장 조회', bx + 26, by + 104, 19, C.ink, 900);
    [['부서명', '9월 마감', '10월 실적'], ['영업 1팀', '12.4억', '13.1억'], ['영업 2팀', '9.8억', '10.6억'], ['온라인팀', '7.2억', '8.9억']].forEach((r, i) => {
      r.forEach((c, j) => T(ctx, c, bx + 28 + j * 120, by + 142 + i * 32, 14.5, i ? C.sub : C.mute, i ? 600 : 800));
    });
    box(ctx, bx + 28, by + 278, 218, 42, (t > 0.8 && t < 1.4) ? '#0B3D91' : C.navy, null, 6);
    T(ctx, '⬇  10월_실적.xlsx 다운로드', bx + 137, by + 305, 14.5, '#FFFFFF', 800, 'center');
    if (t > 1.2) {
      const p = ph(t, 1.2, 2.1);
      box(ctx, bx + 28, by + 334, 218, 30, '#FFFFFF', C.line, 6);
      box(ctx, bx + 36, by + 355, 202 * p, 5, C.blue, null, 3);
      T(ctx, p < 1 ? '다운로드 중…' : '✓ 다운로드 완료', bx + 38, by + 350, 12, p < 1 ? C.mute : C.green, 800);
    }

    // Surprise Modal Popup
    if (t > 2.1 && t < 3.1) {
      ctx.save();
      ctx.fillStyle = 'rgba(15,23,42,0.34)';
      rr(ctx, bx, by + 34, bw, bh - 34, [0, 0, 6, 6]);
      ctx.fill();
      box(ctx, bx + 54, by + 142, 384, 162, '#FFFFFF', C.ink, 8, 2);
      T(ctx, '⚠ 돌발 보안 · 세션 만료 알림', bx + 78, by + 182, 18, C.ink, 900);
      T(ctx, '예상치 못한 팝업이 화면을 가렸습니다.', bx + 78, by + 214, 14, C.sub, 600);
      box(ctx, bx + 320, by + 248, 100, 36, t > 2.7 ? '#991B1B' : C.red, null, 6);
      T(ctx, '✕ 닫기', bx + 370, by + 272, 15, '#FFFFFF', 800, 'center');
      ctx.restore();
    }

    // Window 2: File Explorer (positioned cleanly between Chrome and Sheets with zero text occlusion)
    if (t > 4.2) {
      const a = ph(t, 4.2, 4.7), ex = 368, ey = 146 + (1 - a) * 18, ew = 404, eh = 312;
      ctx.save();
      ctx.globalAlpha = a;
      winFrame(ctx, ex, ey, ew, eh, '파일 탐색기 — 폴더 정리');
      box(ctx, ex, ey + 34, 138, eh - 34, '#F8FAFC', null, 0);
      [['⬇ 다운로드', t < 6.4], ['📁 실적_2026', t >= 6.4], ['📁 증빙보관', false]].forEach(([s, hot], i) => {
        if (hot) box(ctx, ex + 8, ey + 48 + i * 38, 122, 30, C.soft, null, 5);
        T(ctx, s, ex + 15, ey + 68 + i * 38, 13.5, hot ? C.navy : C.sub, 800);
      });
      const mv = ease(ph(t, 5.2, 6.4));
      if (t < 6.4) {
        const ox = t > 5.2 ? lerp(0, -125, mv) : 0, oy = t > 5.2 ? lerp(0, 36, mv) : 0;
        box(ctx, ex + 154 + ox, ey + 72 + oy, 232, 42, '#FFFFFF', C.border, 6);
        box(ctx, ex + 164 + ox, ey + 81 + oy, 22, 22, '#16A34A', null, 4);
        T(ctx, '10월_실적.xlsx', ex + 196 + ox, ey + 98 + oy, 14, C.ink, 800);
      } else {
        T(ctx, '📁 실적_2026 폴더 이동 완료', ex + 154, ey + 74, 13.5, C.mute, 800);
        box(ctx, ex + 154, ey + 90, 232, 42, C.greenS, C.greenB, 6);
        T(ctx, '✓ 10월_실적.xlsx 분류 완료', ex + 168, ey + 116, 13.5, C.green, 800);
      }
      ctx.restore();
    }

    // Window 3: Spreadsheet + Submit
    if (t > 7.4) {
      const a = ph(t, 7.4, 7.9), sx = 788, sy = 76 + (1 - a) * 18, sw = 590, sh = 400;
      ctx.save();
      ctx.globalAlpha = a;
      winFrame(ctx, sx, sy, sw, sh, '10월 전사 실적 취합 시트 — Sheets');
      const sub = t > 10.9;
      box(ctx, sx + sw - 132, sy + 44, 112, 34, sub ? C.green : C.navy, null, 6);
      T(ctx, sub ? '✓ 제출됨' : '최종 제출', sx + sw - 76, sy + 66, 14.5, '#FFFFFF', 800, 'center');
      const cols = ['부서', '9월', '10월', '전월비'];
      const rows = [['영업 1팀', '12.4억', '13.1억', '+5.6%'], ['영업 2팀', '9.8억', '10.6억', '+8.2%'], ['온라인팀', '7.2억', '8.9억', '+23.6%'], ['전사 합계', '29.4억', '32.6억', '+10.9%']];
      cols.forEach((c, j) => {
        box(ctx, sx + 20 + j * 140, sy + 92, 140, 34, '#F1F5F9', C.line, 0, 1);
        T(ctx, c, sx + 32 + j * 140, sy + 115, 14, C.sub, 800);
      });
      rows.forEach((r, i) => {
        const vis = ph(t, 8.0 + i * 0.55, 8.4 + i * 0.55);
        r.forEach((c, j) => {
          box(ctx, sx + 20 + j * 140, sy + 126 + i * 38, 140, 38, i === 3 ? '#F8FAFC' : '#FFFFFF', C.line, 0, 1);
          ctx.save();
          ctx.globalAlpha = a * vis;
          T(ctx, c, sx + 32 + j * 140, sy + 151 + i * 38, 15, j === 3 ? C.green : C.ink, i === 3 ? 900 : 600);
          ctx.restore();
        });
      });
      if (t > 11.2) {
        callout(ctx, sx + 20, sy + 294, sw - 40, 80, '✓ 55개 직무 PC · CLI 실무 완주 (77.4% · 1위)', '화면 조작 예시: 돌발 팝업 닫기 → 폴더 정리 → 시트 제출 완료', 'green', ph(t, 11.2, 11.7));
      }
      ctx.restore();
    }

    // Cursor + Click Ripples
    const [cx, cy] = curAt(t);
    CUR.forEach(k => {
      if (k[3] && t > k[0] && t < k[0] + 0.45) {
        const p = ph(t, k[0], k[0] + 0.45);
        ctx.beginPath();
        ctx.arc(k[1], k[2], 10 + p * 22, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(26,115,232,${1 - p})`;
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    });
    ctx.save();
    ctx.translate(cx, cy);
    ctx.beginPath();
    ctx.moveTo(0, 0); ctx.lineTo(0, 24); ctx.lineTo(6, 19); ctx.lineTo(11, 29); ctx.lineTo(16, 27); ctx.lineTo(11, 17); ctx.lineTo(19, 17); ctx.closePath();
    ctx.fillStyle = '#111827'; ctx.fill(); ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 2; ctx.stroke();
    ctx.restore();
    box(ctx, cx + 20, cy + 24, 84, 24, C.navy, null, 12);
    T(ctx, 'Carbon', cx + 62, cy + 41, 12.5, '#FFFFFF', 800, 'center');
  }

  // ==========================================================================
  // 06. AutomationBench (Zapier) — 6-App Cross-SaaS Conditional Workflow
  // ==========================================================================
  function drawAutoAppIcon(ctx, kind, x, y, s) {
    ctx.save();
    const r = Math.max(4, Math.round(s * 0.24));
    box(ctx, x, y, s, s, '#FFFFFF', '#DCE3EE', r, 1.15);

    if (kind === 'gmail') {
      const mx = x + s * 0.14, my = y + s * 0.22, mw = s * 0.72, mh = s * 0.56, lw = mw * 0.24;
      box(ctx, mx, my + mh * 0.34, lw, mh * 0.66, '#4285F4', null, [0, 0, 0, 2]);
      box(ctx, mx + mw - lw, my + mh * 0.34, lw, mh * 0.66, '#34A853', null, [0, 0, 2, 0]);
      ctx.beginPath();
      ctx.moveTo(mx, my + mh * 0.04);
      ctx.lineTo(mx + lw, my + mh * 0.28);
      ctx.lineTo(mx + lw, my + mh * 0.60);
      ctx.lineTo(mx, my + mh * 0.36);
      ctx.closePath();
      ctx.fillStyle = '#C5221F';
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(mx + mw, my + mh * 0.04);
      ctx.lineTo(mx + mw - lw, my + mh * 0.28);
      ctx.lineTo(mx + mw - lw, my + mh * 0.60);
      ctx.lineTo(mx + mw, my + mh * 0.36);
      ctx.closePath();
      ctx.fillStyle = '#FBBC04';
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(mx + lw, my + mh * 0.28);
      ctx.lineTo(mx + mw * 0.5, my + mh * 0.54);
      ctx.lineTo(mx + mw - lw, my + mh * 0.28);
      ctx.lineTo(mx + mw - lw, my + mh * 0.60);
      ctx.lineTo(mx + mw * 0.5, my + mh * 0.86);
      ctx.lineTo(mx + lw, my + mh * 0.60);
      ctx.closePath();
      ctx.fillStyle = '#EA4335';
      ctx.fill();
    } else if (kind === 'crm') {
      ctx.fillStyle = '#0284C7';
      ctx.beginPath();
      ctx.arc(x + s * 0.34, y + s * 0.56, s * 0.17, 0, Math.PI * 2);
      ctx.arc(x + s * 0.50, y + s * 0.43, s * 0.21, 0, Math.PI * 2);
      ctx.arc(x + s * 0.67, y + s * 0.56, s * 0.16, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(x + s * 0.33, y + s * 0.53, s * 0.35, s * 0.20);
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(x + s * 0.50, y + s * 0.47, s * 0.075, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + s * 0.50, y + s * 0.68, s * 0.135, Math.PI * 1.12, Math.PI * 1.88);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#F59E0B';
      ctx.beginPath();
      ctx.arc(x + s * 0.76, y + s * 0.25, s * 0.095, 0, Math.PI * 2);
      ctx.fill();
    } else if (kind === 'sheets') {
      const sx = x + s * 0.21, sy = y + s * 0.13, sw = s * 0.58, sh = s * 0.74, fd = sw * 0.30;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx + sw - fd, sy);
      ctx.lineTo(sx + sw, sy + fd);
      ctx.lineTo(sx + sw, sy + sh);
      ctx.lineTo(sx, sy + sh);
      ctx.closePath();
      ctx.fillStyle = '#0F9D58';
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(sx + sw - fd, sy);
      ctx.lineTo(sx + sw - fd, sy + fd);
      ctx.lineTo(sx + sw, sy + fd);
      ctx.closePath();
      ctx.fillStyle = '#0B8043';
      ctx.fill();
      const gx = sx + sw * 0.17, gy = sy + sh * 0.43, gw = sw * 0.66, gh = sh * 0.41;
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = Math.max(1.1, s * 0.05);
      ctx.strokeRect(gx, gy, gw, gh);
      ctx.beginPath();
      ctx.moveTo(gx + gw * 0.45, gy); ctx.lineTo(gx + gw * 0.45, gy + gh);
      ctx.moveTo(gx, gy + gh * 0.36); ctx.lineTo(gx + gw, gy + gh * 0.36);
      ctx.moveTo(gx, gy + gh * 0.68); ctx.lineTo(gx + gw, gy + gh * 0.68);
      ctx.stroke();
    } else if (kind === 'branch') {
      const lw = Math.max(1.6, s * 0.085);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#174EA6';
      ctx.lineWidth = lw;
      ctx.beginPath();
      ctx.moveTo(x + s * 0.44, y + s * 0.50);
      ctx.lineTo(x + s * 0.57, y + s * 0.70);
      ctx.lineTo(x + s * 0.76, y + s * 0.70);
      ctx.stroke();
      ctx.fillStyle = '#174EA6';
      ctx.beginPath();
      ctx.moveTo(x + s * 0.84, y + s * 0.70);
      ctx.lineTo(x + s * 0.70, y + s * 0.61);
      ctx.lineTo(x + s * 0.70, y + s * 0.79);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#FF4F00';
      ctx.lineWidth = lw;
      ctx.beginPath();
      ctx.moveTo(x + s * 0.21, y + s * 0.50);
      ctx.lineTo(x + s * 0.44, y + s * 0.50);
      ctx.lineTo(x + s * 0.57, y + s * 0.30);
      ctx.lineTo(x + s * 0.76, y + s * 0.30);
      ctx.stroke();
      ctx.fillStyle = '#FF4F00';
      ctx.beginPath();
      ctx.arc(x + s * 0.21, y + s * 0.50, s * 0.085, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x + s * 0.84, y + s * 0.30);
      ctx.lineTo(x + s * 0.70, y + s * 0.21);
      ctx.lineTo(x + s * 0.70, y + s * 0.39);
      ctx.closePath();
      ctx.fill();
    } else if (kind === 'cal') {
      const cx = x + s * 0.16, cy = y + s * 0.16, cw = s * 0.68, ch = s * 0.68, b = cw * 0.22;
      ctx.fillStyle = '#4285F4'; ctx.fillRect(cx, cy, cw - b, b);
      ctx.fillStyle = '#1A73E8'; ctx.fillRect(cx, cy + b, b, ch - b * 2);
      ctx.fillStyle = '#EA4335'; ctx.fillRect(cx + cw - b, cy, b, b);
      ctx.fillStyle = '#FBBC04'; ctx.fillRect(cx + cw - b, cy + b, b, ch - b * 2);
      ctx.fillStyle = '#34A853'; ctx.fillRect(cx, cy + ch - b, cw - b, b);
      ctx.beginPath();
      ctx.moveTo(cx + cw - b, cy + ch - b);
      ctx.lineTo(cx + cw, cy + ch - b);
      ctx.lineTo(cx + cw - b, cy + ch);
      ctx.closePath();
      ctx.fillStyle = '#188038';
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(cx + b, cy + b, cw - b * 2, ch - b * 2);
      T(ctx, '31', cx + cw * 0.5, cy + ch * 0.64, Math.max(7.5, s * 0.28), '#174EA6', 900, 'center');
    } else if (kind === 'chat') {
      box(ctx, x + s * 0.14, y + s * 0.18, s * 0.50, s * 0.38, '#00AC47', null, 3.5);
      ctx.beginPath();
      ctx.moveTo(x + s * 0.20, y + s * 0.54);
      ctx.lineTo(x + s * 0.20, y + s * 0.68);
      ctx.lineTo(x + s * 0.34, y + s * 0.54);
      ctx.closePath();
      ctx.fillStyle = '#00AC47';
      ctx.fill();
      box(ctx, x + s * 0.35, y + s * 0.35, s * 0.51, s * 0.39, '#188038', '#FFFFFF', 3.5, 1);
      ctx.beginPath();
      ctx.moveTo(x + s * 0.80, y + s * 0.72);
      ctx.lineTo(x + s * 0.80, y + s * 0.85);
      ctx.lineTo(x + s * 0.67, y + s * 0.72);
      ctx.closePath();
      ctx.fillStyle = '#188038';
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(x + s * 0.44, y + s * 0.48, s * 0.33, Math.max(1.3, s * 0.06));
      ctx.fillRect(x + s * 0.44, y + s * 0.59, s * 0.22, Math.max(1.3, s * 0.06));
    }
    ctx.restore();
  }

  function drawAuto(ctx, t) {
    const st = t > 8.8 ? 4 : t > 6.0 ? 3 : t > 3.2 ? 2 : t > 1.0 ? 1 : 0;
    chips(ctx, ['주문 변경 메일 수신', 'CRM · 재고 시트 조회', '조건 분기 · 청구 · 일정 갱신', '6개 앱 무인 완주 (53.9% · 1위)'], st);

    box(ctx, 0, 48, 1400, 504, C.bg, C.line, 0);

    const nodes = [
      ['gmail', '1. Gmail 수신', '수량 변경 +120대', '주문번호 #PO-4820', 0.4],
      ['crm', '2. CRM 조회', 'VIP Tier-1 확인', '약정 할인율 10%', 1.6],
      ['sheets', '3. 재고 Sheets', '현 재고 80대 차감', '부족분 40대 산출', 2.9],
      ['branch', '4. 조건 분기', '재고 부족 규칙 실행', '80 출고 + 40 발주', 4.3],
      ['cal', '5. 청구 · 일정', '할인 청구서 발행', '1·2차 납기 등록', 5.9],
      ['chat', '6. 사내 메신저', '담당팀 요약 공유', '감사 추적 링크 첨부', 7.4]
    ];
    nodes.forEach(([icon, title, l1, l2, trig], i) => {
      const nx = 14 + i * 233, ny = 66, nw = 207, nh = 148;
      const active = t >= trig && t < trig + 1.1;
      const done = t >= trig + 1.1;
      const isBranch = i === 3;

      const bd = done ? C.green : active ? C.navy : C.border;
      const hdFill = done ? C.greenS : (active || isBranch) ? C.soft : C.card;
      const hdFg = done ? C.green : (active || isBranch) ? C.navy : C.ink;

      box(ctx, nx, ny, nw, nh, '#FFFFFF', bd, 0, (done || active) ? 2.2 : 1.3);
      box(ctx, nx, ny, nw, 38, hdFill, null, 0);
      drawAutoAppIcon(ctx, icon, nx + 9, ny + 6, 26);
      T(ctx, title, nx + 42, ny + 25, 13.8, hdFg, 800);
      T(ctx, l1, nx + 12, ny + 65, 13.5, C.ink, 800);
      T(ctx, l2, nx + 12, ny + 89, 12.5, C.sub, 600);
      pill(ctx, nx + 12, ny + 112, done ? '✓ 실행 완료' : active ? '● 처리 중' : '대기 중', done ? C.greenS : active ? C.navy : C.card, done ? C.green : active ? '#FFFFFF' : C.mute, 12, 24);

      if (i < 5) {
        const ax1 = nx + nw + 3, ax2 = nx + 230;
        arrow(ctx, ax1, ny + 74, ax2, ny + 74, done ? C.green : active ? C.navy : C.border, 2.3);
      }
    });

    // Bottom Left: Trigger Email + Conditional Business Rules
    winFrame(ctx, 14, 232, 668, 306, '고객 주문 변경 메일 및 Zapier 다중 조건 분기 규칙');
    box(ctx, 30, 278, 636, 98, '#F8FAFC', C.line, 0);
    drawAutoAppIcon(ctx, 'gmail', 42, 286, 24);
    pill(ctx, 72, 287, 'Gmail 수신 · #PO-4820', C.soft, C.navy, 12, 22);
    T(ctx, 'buyer@global-partner.com', 652, 302, 11.5, C.mute, 600, 'right', MONO);
    T(ctx, '"북미 법인 긴급 요청으로 #PO-4820 수량을 120대로 증량합니다.', 42, 336, 13.5, C.ink, 700);
    T(ctx, ' 가용 재고는 즉시 출고해 주시고 부족 물량 납기 일정을 회신 바랍니다."', 42, 360, 13.5, C.sub, 600);

    box(ctx, 30, 390, 636, 134, '#FFFFFF', t > 4.3 ? C.navy : C.border, 0, t > 4.3 ? 1.8 : 1.2);
    box(ctx, 30, 390, 636, 34, C.soft, null, 0);
    drawAutoAppIcon(ctx, 'branch', 40, 396, 22);
    T(ctx, 'Carbon 다중 앱 조건 분기 판단 (사람 개입 없음)', 68, 412, 13.8, C.navy, 800);
    const r1 = t >= 2.2, r2 = t >= 4.5;
    drawAutoAppIcon(ctx, 'crm', 42, 439, 20);
    T(ctx, (r1 ? '✓ ' : '· ') + '규칙 1: CRM 고객 등급 == VIP Tier-1  →  청구서 단가 10% 자동 할인', 68, 454, 13.2, r1 ? C.green : C.mute, 800);
    drawAutoAppIcon(ctx, 'sheets', 42, 475, 20);
    T(ctx, (r2 ? '✓ ' : '· ') + '규칙 2: 시트 재고(80) < 요청(120)  →  80대 즉시 출고 + 40대 생산 발주 분리', 68, 490, 13.2, r2 ? C.navy : C.mute, 800);

    // Bottom Right: Cross-SaaS Live Execution Log + Verdict
    box(ctx, 700, 232, 686, 306, '#FFFFFF', C.line, 0);
    box(ctx, 700, 232, 686, 38, C.navy, null, 0);
    T(ctx, '6개 업무 SaaS 실시간 연쇄 실행 로그', 718, 257, 15, '#FFFFFF', 800);

    const logs = [
      [1.8, 'crm', 'Gmail → CRM: #PO-4820 고객 원장 대조 완료 (VIP · 10% 할인)'],
      [3.4, 'sheets', 'Sheets: 창고 재고 80대 차감 기록 · 부족 수량 40대 자동 산출'],
      [5.8, 'cal', 'Billing · Calendar: 할인 청구서 발행 · 1·2차 출하 일정 등록'],
      [7.8, 'chat', 'Team Chat: 영업·물류 채널에 처리 요약 및 감사 링크 게시 완료']
    ];
    logs.forEach(([lt, icon, txt], idx) => {
      const ly = 282 + idx * 38, ok = t >= lt;
      box(ctx, 716, ly, 654, 32, ok ? '#F8FAFC' : C.bg, ok ? C.greenB : C.line, 0);
      drawAutoAppIcon(ctx, icon, 723, ly + 5, 22);
      T(ctx, (ok ? '✓ ' : '· ') + txt, 752, ly + 21, 13.0, ok ? C.ink : C.mute, 700);
    });

    if (t > 8.4) {
      callout(ctx, 716, 440, 654, 84, '✓ 6개 업무 앱 조건 분기 무인 완주', 'AutomationBench (Zapier) 53.9% · 전 모델 1위', 'green', ph(t, 8.4, 9.0));
    }
  }

  // ==========================================================================
  // 07. Vending-Bench 2 — 15-Slot Vending Machine + 365-Day Revenue Curve
  // ==========================================================================
  const VEND_LOG = [
    [5, '초기 자본 $500 · 판매 데이터 수집'],
    [42, '인기 1위 콜라 → 진열 슬롯 2칸 확대'],
    [98, '여름 폭염 예보 → 생수 선제 2배 발주'],
    [146, '도매가 인상 → 공급처 전환 (원가 -12%)'],
    [204, '늦여름 장마 → 온장 커피 품목 추가'],
    [262, '가을 기온 하락 → 아이스 음료 축소'],
    [318, '겨울 임박 스낵 15% 타임세일 소진'],
    [365, '1년 무결품 · 파산 0회 · $16,484 완주']
  ];
  const vendBal = d => 500 + 15984 * Math.pow(d / 365, 1.52) + Math.sin(d * 0.42) * 55 * (d / 365) * (1 - d / 365);
  const vendFlashBal = d => {
    const u = d / 365;
    const base = 500 + 4594 * (0.62 * Math.pow(u, 0.88) + 0.38 * Math.pow(u, 1.35));
    const dip = -340 * Math.exp(-Math.pow((d - 166) / 45, 2)) + Math.sin(d * 0.28) * 45 * u * (1 - u);
    return Math.max(480, base + dip);
  };
  function drawVending(ctx, t) {
    const d = Math.round(365 * ease(ph(t, 0.3, 11.2)));
    const stage = d >= 365 ? 4 : d > 240 ? 2 : d > 80 ? 1 : 0;
    chips(ctx, ['일별 판매량 확인', '날씨 · 수요 예측 발주', '원가 · 유통기한 탄력 가격', '365일(1년) 장기 운영 완주'], stage);

    const vy = 48;
    box(ctx, 0, vy, 296, 504, '#1E3A8A', null, 12);
    box(ctx, 18, vy + 40, 206, 372, '#DBEAFE', null, 6);
    T(ctx, d < 91 ? '계절: 봄' : d < 181 ? '계절: 여름 성수기' : d < 271 ? '계절: 가을' : '계절: 겨울', 148, vy + 27, 15, '#FFFFFF', 800, 'center');
    const cols = ['#DC2626', '#2563EB', '#16A34A', '#D97706', '#7C3AED'];
    const names = ['콜라', '생수', '녹차', '커피', '주스'];
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 3; c++) {
        const i = r * 3 + c;
        const lvl = 0.3 + 0.7 * Math.abs(Math.cos(d * 0.05 + i * 1.2));
        const n = Math.max(1, Math.round(lvl * 5));
        const sx = 28 + c * 64, sy = vy + 52 + r * 70;
        box(ctx, sx, sy, 56, 60, '#FFFFFF', null, 5);
        for (let k = 0; k < n; k++) box(ctx, sx + 5 + k * 9.5, sy + 9, 7.5, 30, cols[(r + c) % 5], null, 2);
        T(ctx, names[(r + c) % 5], sx + 28, sy + 53, 11, C.sub, 800, 'center');
      }
    }
    box(ctx, 236, vy + 60, 44, 96, '#0F172A', null, 6);
    T(ctx, '$', 258, vy + 118, 25, '#4ADE80', 900, 'center');
    box(ctx, 38, vy + 432, 220, 48, '#0F172A', null, 6);

    const cx = 324, cw = 630;
    T(ctx, `Day ${d} / 365`, cx, vy + 42, 28, C.ink, 900);
    T(ctx, '3.8 Flash 잔고', cx + 356, vy + 15, 12.5, C.mute, 800, 'right');
    T(ctx, '$' + Math.round(vendFlashBal(d)).toLocaleString('en-US'), cx + 356, vy + 45, 24, '#64748B', 800, 'right');
    T(ctx, '4 Carbon 누적 잔고', cx + cw, vy + 15, 13, C.navy, 800, 'right');
    T(ctx, '$' + Math.round(vendBal(d)).toLocaleString('en-US'), cx + cw, vy + 48, 36, d >= 365 ? C.green : C.navy, 900, 'right');

    const gx = cx, gy = vy + 68, gw = cw, gh = 436;
    box(ctx, gx, gy, gw, gh, '#FFFFFF', C.line, 0);
    [['봄 (1~90일)', 0, 90, '#F0FDF4'], ['여름 (91~180일)', 90, 180, '#FFF7ED'], ['가을 (181~270일)', 180, 270, '#F0F9FF'], ['겨울 (271~365일)', 270, 365, '#F8FAFC']].forEach(([s, a, b, bg]) => {
      ctx.fillStyle = bg;
      ctx.fillRect(gx + 54 + (gw - 74) * a / 365, gy + 12, (gw - 74) * (b - a) / 365, gh - 50);
      T(ctx, s, gx + 54 + (gw - 74) * (a + b) / 730, gy + 32, 11.5, C.mute, 800, 'center');
    });
    const X = dd => gx + 54 + (gw - 74) * dd / 365;
    const Y = v => gy + gh - 38 - (gh - 68) * v / 17200;
    [0, 5000, 10000, 15000].forEach(v => {
      const yy = Y(v);
      ctx.save();
      ctx.strokeStyle = 'rgba(148,163,184,0.28)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(X(0), yy);
      ctx.lineTo(X(365), yy);
      ctx.stroke();
      ctx.restore();
      T(ctx, '$' + (v / 1000) + 'k', gx + 46, yy + 5, 12, C.mute, 700, 'right');
    });

    // Subtle shaded gap area between Carbon & 3.8 Flash
    if (d >= 2) {
      ctx.save();
      ctx.beginPath();
      for (let k = 0; k <= d; k++) {
        const px = X(k), py = Y(vendBal(k));
        k ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
      }
      for (let k = d; k >= 0; k--) {
        ctx.lineTo(X(k), Y(vendFlashBal(k)));
      }
      ctx.closePath();
      ctx.fillStyle = 'rgba(23,78,166,0.08)';
      ctx.fill();
      ctx.restore();
    }

    // Gemini 3.8 Flash comparison curve ($5,094)
    ctx.save();
    ctx.beginPath();
    for (let k = 0; k <= d; k++) {
      const px = X(k), py = Y(vendFlashBal(k));
      k ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
    }
    ctx.strokeStyle = '#64748B';
    ctx.lineWidth = 3;
    ctx.setLineDash([7, 5]);
    ctx.stroke();
    ctx.restore();
    ctx.beginPath();
    ctx.arc(X(d), Y(vendFlashBal(d)), 5.5, 0, Math.PI * 2);
    ctx.fillStyle = '#64748B';
    ctx.fill();

    // Gemini 4 Carbon primary curve ($16,484)
    ctx.beginPath();
    for (let k = 0; k <= d; k++) {
      const px = X(k), py = Y(vendBal(k));
      k ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
    }
    ctx.strokeStyle = C.navy;
    ctx.lineWidth = 4.2;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(X(d), Y(vendBal(d)), 7.5, 0, Math.PI * 2);
    ctx.fillStyle = d >= 365 ? C.green : C.navy;
    ctx.fill();

    // Legend card in upper-left open chart space
    const lgx = gx + 64, lgy = gy + 48;
    box(ctx, lgx, lgy, 224, 58, 'rgba(255,255,255,0.94)', C.line, 6);
    ctx.strokeStyle = C.navy; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(lgx + 12, lgy + 19); ctx.lineTo(lgx + 36, lgy + 19); ctx.stroke();
    T(ctx, '4 Carbon ($16,484 · 1위)', lgx + 44, lgy + 23, 12.5, C.navy, 900);
    ctx.save();
    ctx.strokeStyle = '#64748B'; ctx.lineWidth = 2.8; ctx.setLineDash([6, 4]);
    ctx.beginPath(); ctx.moveTo(lgx + 12, lgy + 42); ctx.lineTo(lgx + 36, lgy + 42); ctx.stroke();
    ctx.restore();
    T(ctx, '3.8 Flash ($5,094 · 비교)', lgx + 44, lgy + 46, 12.5, '#475569', 800);

    // Mid-run stagnation note on 3.8 Flash & endpoint comparison callouts
    if (d >= 180) {
      const mx = X(170), my = Y(vendFlashBal(170));
      box(ctx, mx - 78, my + 12, 156, 24, '#F1F5F9', '#CBD5E1', 12);
      T(ctx, '원가 인상 · 재고 오차 정체', mx, my + 28, 11, '#475569', 800, 'center');
    }
    if (d >= 335) {
      const cEndY = Y(16484), fEndY = Y(5094);
      box(ctx, X(365) - 182, cEndY - 6, 168, 28, C.soft, '#93C5FD', 14);
      T(ctx, '4 Carbon  $16,484 (3.2x)', X(365) - 98, cEndY + 12.5, 12, C.navy, 900, 'center');
      box(ctx, X(365) - 160, fEndY - 34, 148, 26, '#F8FAFC', '#CBD5E1', 13);
      T(ctx, '3.8 Flash  $5,094', X(365) - 86, fEndY - 16.5, 12, '#475569', 800, 'center');
    }

    T(ctx, 'Day 1 ($500)', X(16), gy + gh - 13, 12.5, C.mute, 700, 'center');
    T(ctx, 'Day 180', X(180), gy + gh - 13, 12.5, C.mute, 700, 'center');
    T(ctx, 'Day 365 (완주)', X(340), gy + gh - 13, 12.5, C.navy, 800, 'center');

    const lx = 978, lw = 422;
    box(ctx, lx, vy, lw, 504, '#FFFFFF', C.line, 0);
    box(ctx, lx, vy, lw, 42, C.card, C.line, 0);
    T(ctx, 'Carbon의 365일 자율 운영 로그', lx + 18, vy + 27, 16, C.ink, 900);
    const visLogs = VEND_LOG.filter(([dd]) => dd <= d);
    visLogs.forEach(([dd, s], i) => {
      const yy = vy + 54 + i * 54, latest = i === visLogs.length - 1;
      box(ctx, lx + 14, yy, lw - 28, 44, latest ? C.soft : C.bg, latest ? C.navy : C.line, 0);
      T(ctx, `Day ${String(dd).padStart(3, '0')}`, lx + 26, yy + 28, 13.5, C.navy, 900, 'left', MONO);
      T(ctx, s, lx + 102, yy + 28, 14.5, C.ink, 700);
    });
  }

  // ==========================================================================
  // 08. Chartography — Dual-Axis Semiconductor Chart + Laser Crosshair
  // ==========================================================================
  function drawChart(ctx, t) {
    const st = t > 8.6 ? 4 : t > 6.0 ? 3 : t > 3.6 ? 2 : t > 1.2 ? 1 : 0;
    chips(ctx, ['좌 · 우 서로 다른 축 분리', '착시 교차점 함정 배제', '최고 온도 시점 포착', '우측 수율 눈금 94.8% 판독'], st);

    const gx = 0, gy = 48, gw = 950, gh = 504;
    box(ctx, gx, gy, gw, gh, '#FFFFFF', C.line, 0);
    T(ctx, '반도체 CVD 증착 챔버 이중 보조축 공정 차트', gx + 24, gy + 36, 18, C.ink, 900);
    T(ctx, '━ 좌측 주축: 챔버 온도 (°C, 파란 실선)     ┅ 우측 보조축: 공정 수율 (%, 초록 점선)', gx + 24, gy + 62, 13.5, C.sub, 700);

    const px = 88, py = gy + 92, pw = 764, ph_ = 356;
    for (let r = 0; r <= 4; r++) {
      const yy = py + (ph_ / 4) * r;
      ctx.strokeStyle = '#E5E7EB'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(px, yy); ctx.lineTo(px + pw, yy); ctx.stroke();
      T(ctx, `${460 - r * 25}°C`, px - 12, yy + 5, 13, C.navy, 800, 'right');
      T(ctx, `${100 - r * 5}%`, px + pw + 12, yy + 5, 13, C.green, 800, 'left');
    }
    // Left axis (Navy) & Right axis (Green)
    box(ctx, px - 3, py, 3, ph_, C.navy);
    box(ctx, px + pw, py, 3, ph_, C.green);
    ['14:05', '14:15', '14:22 (교차)', '14:35 (피크)', '14:45', '14:55'].forEach((lb, i) => {
      const xx = px + (pw * i) / 5;
      T(ctx, lb, xx, py + ph_ + 26, 13, i === 3 ? C.navy : C.mute, i === 3 ? 900 : 700, 'center');
    });

    const tempAt = u => 372 + 78.4 * Math.exp(-Math.pow((u - 0.60) / 0.24, 2)); // peaks u=0.60 -> 450.4°C
    const yldAt = u => (u <= 0.65 ? 90.2 + 7.6 * u : 95.14 - 26 * Math.pow(u - 0.65, 1.4)); // at u=0.60 -> 94.8%
    const Ytemp = v => py + ph_ - ((v - 360) / 100) * ph_;
    const Yyld = v => py + ph_ - ((v - 80) / 20) * ph_;

    // Draw Temp Curve (Solid Navy)
    ctx.beginPath();
    for (let k = 0; k <= 100; k++) {
      const u = k / 100, xx = px + u * pw, yy = Ytemp(tempAt(u));
      k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy);
    }
    ctx.strokeStyle = C.navy; ctx.lineWidth = 3.5; ctx.stroke();

    // Draw Yield Curve (Dashed Green)
    ctx.save();
    ctx.setLineDash([8, 5]);
    ctx.beginPath();
    for (let k = 0; k <= 100; k++) {
      const u = k / 100, xx = px + u * pw, yy = Yyld(yldAt(u));
      k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy);
    }
    ctx.strokeStyle = '#16A34A'; ctx.lineWidth = 3.2; ctx.stroke();
    ctx.restore();

    // Animated Scan Crosshair: sweeps 0 -> 0.40 (checks illusion) -> 0.60 (locks onto true peak)
    const uScan = t < 2.2 ? lerp(0.08, 0.39, ease(ph(t, 0.4, 2.0))) : lerp(0.39, 0.60, ease(ph(t, 2.8, 4.4)));
    const sx = px + uScan * pw;
    ctx.save();
    ctx.strokeStyle = 'rgba(23,78,166,0.55)'; ctx.lineWidth = 2; ctx.setLineDash([5, 4]);
    ctx.beginPath(); ctx.moveTo(sx, py); ctx.lineTo(sx, py + ph_); ctx.stroke();
    ctx.restore();

    // Trap rejection marker at u = 0.39
    if (t > 1.9) {
      const tx_ = px + 0.39 * pw, ty_ = Ytemp(tempAt(0.39));
      box(ctx, tx_ - 98, ty_ + 16, 196, 28, C.amberS, C.amberB, 14);
      T(ctx, '✕ 두 선 교차 착시 (424°C · 최고점 아님)', tx_, ty_ + 35, 11.5, C.amber, 800, 'center');
    }

    // Peak lock & RIGHT-axis projection at u = 0.60
    if (t > 4.4) {
      const pkX = px + 0.60 * pw, pkTempY = Ytemp(450.4), pkYldY = Yyld(94.8);
      ctx.beginPath(); ctx.arc(pkX, pkTempY, 7, 0, Math.PI * 2); ctx.fillStyle = C.navy; ctx.fill();
      pill(ctx, pkX - 90, pkTempY - 36, '① 최고 온도 450.4°C (좌측 축)', C.soft, C.navy, 12.5, 26);

      if (t > 5.8) {
        arrow(ctx, pkX, pkTempY + 10, pkX, pkYldY - 8, C.ink, 2.2);
        ctx.beginPath(); ctx.arc(pkX, pkYldY, 8, 0, Math.PI * 2); ctx.fillStyle = C.green; ctx.fill();
      }
      if (t > 6.8) {
        const pProj = ease(ph(t, 6.8, 8.0));
        arrow(ctx, pkX + 10, pkYldY, lerp(pkX + 10, px + pw - 4, pProj), pkYldY, C.green, 3.2);
        box(ctx, px + pw + 6, pkYldY - 16, 74, 32, C.green, null, 4);
        T(ctx, '94.8%', px + pw + 43, pkYldY + 6, 15, '#FFFFFF', 900, 'center');
      }
    }

    // Right Reasoning Card
    const rx = 974, rw = 426;
    box(ctx, rx, gy, rw, gh, '#FFFFFF', C.line, 0);
    box(ctx, rx, gy, rw, 42, C.soft, C.line, 0);
    T(ctx, '질문: 최고 온도 시점의 공정 수율(%)은?', rx + 18, gy + 27, 16, C.navy, 900);

    const steps = [
      ['1. 좌 · 우 눈금 축 분리 인식', '좌측 = 온도(360~460°C), 우측 = 수율(80~100%)', t > 1.2],
      ['2. 14:22 선 겹침 착시 배제', '두 그래프가 만나는 점이지 최고 온도가 아님', t > 2.4],
      ['3. 14:35 실제 온도 피크 포착', '파란 실선 최고점 = 450.4°C 시각 특정', t > 4.6],
      ['4. 동일 시각 → 우측 축 수평 투영', '왼쪽 눈금(423°C 오독)이 아닌 오른쪽 94.8% 판독', t > 7.2]
    ];
    steps.forEach(([h, s, ok], i) => {
      const yy = gy + 60 + i * 82;
      box(ctx, rx + 16, yy, rw - 32, 68, ok ? C.greenS : C.bg, ok ? C.greenB : C.line, 0);
      T(ctx, (ok ? '✓ ' : '· ') + h, rx + 30, yy + 27, 15, ok ? C.green : C.mute, 900);
      T(ctx, s, rx + 30, yy + 51, 13.5, ok ? C.ink : C.mute, 600);
    });
    if (t > 8.4) {
      callout(ctx, rx + 16, gy + 402, rw - 32, 84, '정답: 수율 94.8% 정확 판독', '복합 보조축 · 중첩 차트 해독 72.5% (1위)', 'green', ph(t, 8.4, 9.0));
    }
  }

  // ==========================================================================
  // 09. Blueprint-Bench 2 — 20 Photos -> 2D Blueprint -> Seamless 3D Extrusion
  // ==========================================================================
  function drawPlan(ctx, t) {
    const stage = t > 10.6 ? 4 : t > 7.2 ? 3 : t > 3.2 ? 2 : t > 0.8 ? 1 : 0;
    chips(ctx, ['현장 실내 사진 20장 입력', '공간 메모장 단서 연결', '2D 평면 설계도 복원', '3D 공간 확장 완결 (58.6% · 1위)'], stage);

    // 1. Left Panel: 20 Multi-Angle Interior Photos + Persistent Spatial Notepad
    winFrame(ctx, 0, 48, 452, 504, '현장 실내 촬영 사진 20장 (Cam 01 ~ Cam 20)');
    const scanCnt = Math.min(20, Math.max(1, Math.round(ease(ph(t, 0.3, 3.8)) * 20)));
    box(ctx, 14, 92, 424, 28, C.soft, C.line, 4);
    T(ctx, `실내 다각도 사진 스캔: ${scanCnt} / 20장 완료`, 26, 111, 13, C.navy, 800);
    box(ctx, 306, 101, 118, 10, '#DBEAFE', null, 5);
    box(ctx, 306, 101, 118 * (scanCnt / 20), 10, C.navy, null, 5);

    const cams = [
      ['Cam 01 · 거실 → 주방', '남서 창 · 동측 개방 통로', 0.5],
      ['Cam 06 · 중앙 복도', '침실 2곳 · 욕실 문 3개', 1.2],
      ['Cam 13 · 침실 1 내부', '북서 코너 · 붙박이 벽체', 1.9],
      ['Cam 19 · 주방 · 현관', '식당 폭 · 현관문 방향', 2.6]
    ];
    cams.forEach(([title, clue, trig], i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const px = 14 + col * 216, py = 128 + row * 128, pw = 208, ph_ = 118;
      const scanned = t >= trig;
      box(ctx, px, py, pw, ph_, '#F8FAFC', scanned ? C.navy : C.border, 4, scanned ? 1.8 : 1);
      ctx.save();
      ctx.strokeStyle = scanned ? '#64748B' : '#CBD5E1';
      ctx.lineWidth = 1.2;
      const rx = px + 54, ry = py + 28, rw = 100, rh = 44;
      ctx.strokeRect(rx, ry, rw, rh);
      [[px + 8, py + 8, rx, ry], [px + pw - 8, py + 8, rx + rw, ry], [px + 8, py + ph_ - 28, rx, ry + rh], [px + pw - 8, py + ph_ - 28, rx + rw, ry + rh]].forEach(([x0, y0, x1, y1]) => {
        ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
      });
      box(ctx, rx + (i % 2 ? 18 : 60), ry + 10, 22, 34, scanned ? '#E8F0FE' : '#E2E8F0', scanned ? C.blue : '#94A3B8', 0, 1.3);
      if (i !== 1) box(ctx, px + 16, py + 24, 24, 26, '#E0F2FE', '#38BDF8', 0, 1.2);
      ctx.restore();

      box(ctx, px, py, pw, 22, scanned ? C.soft : C.card, null, 0);
      T(ctx, title, px + 8, py + 15.5, 11.3, scanned ? C.navy : C.sub, 800);
      box(ctx, px, py + ph_ - 24, pw, 24, '#FFFFFF', C.line, 0);
      T(ctx, (scanned ? '✓ ' : '') + clue, px + 8, py + ph_ - 8, 11.2, scanned ? C.green : C.mute, 700);
    });

    // Persistent Spatial Notepad
    box(ctx, 14, 390, 424, 146, '#F8FAFC', C.navy, 0, 1.5);
    box(ctx, 14, 390, 424, 30, C.soft, null, 0);
    T(ctx, 'Carbon 공간 메모장 (20장 시점 단서 누적 · 조합)', 24, 410, 13.2, C.navy, 900);
    const notes = [
      [1.4, '• Cam 01·04: 거실(남서) ↔ 주방(남동) 개방형 통로 연결'],
      [2.5, '• Cam 06·11: 중앙 복도 기준 침실 2곳 · 욕실 문 위치 확정'],
      [3.6, '• Cam 13·19: 창호 방향 대조 → 2D · 3D 실측 비율 산출']
    ];
    notes.forEach(([nt, txt], idx) => {
      if (t >= nt) T(ctx, txt, 24, 446 + idx * 30, 12.5, C.ink, 700);
    });

    // 2. Center Panel: Reconstructed 2D Blueprint -> Seamless 3D Spatial Model
    const cx = 468, cy = 48, cw = 572, ch = 504;
    box(ctx, cx, cy, cw, ch, '#FFFFFF', C.line, 0);
    box(ctx, cx, cy, cw, 42, C.soft, C.line, 0);
    T(ctx, '복원된 설계도 (11.6m × 8.8m · 2D → 3D)', cx + 16, cy + 27, 15.5, C.navy, 900);

    const p2d = ease(ph(t, 2.4, 5.4));
    const morph = ease(ph(t, 7.2, 9.6));
    const rise = ease(ph(t, 7.8, 10.6));
    if (t >= 2.4) {
      const pTxt = t >= 7.2
        ? (rise > 0.85 ? '✓ 2D → 3D 공간 확장 완료' : '● 2D → 3D 입체 변환 중')
        : (p2d > 0.95 ? '✓ 2D 평면 설계도 완성' : '● 2D 평면 설계도 작성 중');
      const pBg = (t >= 7.2 && rise > 0.85) ? C.green : C.navy;
      const pW = tw(ctx, pTxt, 12, 700) + 22;
      pill(ctx, cx + cw - pW - 14, cy + 8, pTxt, pBg, '#FFFFFF', 12, 26);
    }

    const ccx = 5.8, ccy = 4.4;
    const yaw = morph * (-0.30 + 0.06 * ease(ph(t, 9.6, 12.2)));
    const cs = Math.cos(yaw), sn = Math.sin(yaw);
    const tilt = lerp(1.0, 0.58, morph);
    const S = lerp(36.8, 36.6, morph);
    const OX = cx + cw * 0.515, OY = cy + 260 + morph * 24;
    const P = (x, y, z = 0) => {
      const u = x - ccx, v = y - ccy;
      const rx = u * cs - v * sn;
      const ry = u * sn + v * cs;
      return [OX + rx * S, OY + ry * tilt * S - z * 0.82 * S];
    };
    const depth = (x, y) => (x - ccx) * sn + (y - ccy) * cs;
    const poly = (pts, fill, stroke, lw = 1) => {
      ctx.beginPath();
      pts.forEach((p, idx) => (idx ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
      ctx.closePath();
      if (fill) { ctx.fillStyle = fill; ctx.fill(); }
      if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
    };

    if (morph > 0.03) {
      const slabH = -0.18 * morph;
      const sc = [[0, 0], [11.6, 0], [11.6, 8.8], [0, 8.8]];
      [0, 1, 2, 3].map(k => ({ a: sc[k], b: sc[(k + 1) % 4], d: depth((sc[k][0] + sc[(k + 1) % 4][0]) / 2, (sc[k][1] + sc[(k + 1) % 4][1]) / 2) }))
        .filter(f => f.d > -0.5)
        .sort((A, B) => A.d - B.d)
        .forEach((f, idx) => {
          poly([P(f.a[0], f.a[1], slabH), P(f.b[0], f.b[1], slabH), P(f.b[0], f.b[1], 0), P(f.a[0], f.a[1], 0)], idx % 2 ? '#CBD5E1' : '#94A3B8', '#94A3B8', 0.8);
        });
    }

    poly([P(0, 0), P(11.6, 0), P(11.6, 8.8), P(0, 8.8)], '#F8FAFC', '#CBD5E1', 1.4);
    if (t > 3.8) {
      const aZone = ease(ph(t, 3.8, 5.4)) * 0.85;
      ctx.save();
      ctx.globalAlpha = aZone;
      const rooms = [
        [0, 0, 4.5, 3.5, '#F1F5F9'],
        [4.5, 0, 7.4, 3.5, '#E0F2FE'],
        [7.4, 0, 11.6, 3.5, '#EFF6FF'],
        [0, 3.5, 8.8, 5.0, '#FEF9C3'],
        [8.8, 3.5, 11.6, 5.0, '#F1F5F9'],
        [0, 5.0, 6.8, 8.8, '#EFF6FF'],
        [6.8, 5.0, 11.6, 8.8, '#ECFDF5']
      ];
      rooms.forEach(([x0, y0, x1, y1, col]) => {
        poly([P(x0, y0), P(x1, y0), P(x1, y1), P(x0, y1)], col, null);
      });
      ctx.restore();
    }

    ctx.save();
    ctx.strokeStyle = 'rgba(148,163,184,0.28)';
    ctx.lineWidth = 1;
    for (let gx = 1; gx <= 11; gx++) {
      const a = P(gx, 0), b = P(gx, 8.8);
      ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
    }
    for (let gy = 1; gy <= 8; gy++) {
      const a = P(0, gy), b = P(11.6, gy);
      ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
    }
    ctx.restore();

    if (t > 3.0) {
      const dimY = 9.28 + morph * 0.28;
      const dA = P(0, dimY), dB = P(11.6, dimY), dMid = P(5.8, dimY + 0.44);
      ctx.strokeStyle = '#64748B'; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(dA[0], dA[1]); ctx.lineTo(dB[0], dB[1]); ctx.stroke();
      T(ctx, '11.6 m', dMid[0], dMid[1] + 5, 12, C.sub, 800, 'center');
      const wA = P(-0.34, 0), wB = P(-0.34, 8.8), wMid = P(-0.56, 4.4);
      ctx.beginPath(); ctx.moveTo(wA[0], wA[1]); ctx.lineTo(wB[0], wB[1]); ctx.stroke();
      T(ctx, '8.8 m', wMid[0] - 4, wMid[1] + 4, 11.5, C.sub, 800, 'right');
    }

    const DOORS = [
      [2.7, 3.5, 0.85, 0, -Math.PI * 0.42],
      [5.4, 3.5, 0.76, 0, -Math.PI * 0.42],
      [7.7, 3.5, 0.82, 0, -Math.PI * 0.42],
      [8.8, 3.85, 0.76, Math.PI * 0.5, Math.PI * 0.92]
    ];
    if (t > 5.0) {
      const aDoor = ease(ph(t, 5.0, 6.0));
      ctx.save();
      ctx.globalAlpha = aDoor;
      DOORS.forEach(([hx, hy, r, a0, a1]) => {
        const pts = [P(hx, hy)];
        for (let k = 0; k <= 14; k++) {
          const ang = lerp(a0, a1, k / 14);
          pts.push(P(hx + r * Math.cos(ang), hy + r * Math.sin(ang)));
        }
        poly(pts, 'rgba(22,163,74,0.18)', null);
        ctx.save();
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = C.green;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        for (let k = 1; k < pts.length; k++) (k === 1 ? ctx.moveTo(pts[k][0], pts[k][1]) : ctx.lineTo(pts[k][0], pts[k][1]));
        ctx.stroke();
        ctx.restore();
      });
      const pL = P(6.15, 6.85), pR = P(7.45, 6.85);
      arrow(ctx, pL[0], pL[1], pR[0], pR[1], C.blue, 2);
      arrow(ctx, pR[0], pR[1], pL[0], pL[1], C.blue, 2);
      ctx.restore();
    }

    if (p2d > 0.02) {
      const WALL_SEGS = [
        [0, 0, 1.1, 0, 'wall'], [1.1, 0, 2.9, 0, 'win'], [2.9, 0, 8.5, 0, 'wall'], [8.5, 0, 10.3, 0, 'win'], [10.3, 0, 11.6, 0, 'wall'],
        [0, 0, 0, 8.8, 'wall'], [11.6, 0, 11.6, 8.8, 'wall'],
        [0, 8.8, 1.4, 8.8, 'wall'], [1.4, 8.8, 4.4, 8.8, 'win'], [4.4, 8.8, 8.0, 8.8, 'wall'], [8.0, 8.8, 10.4, 8.8, 'win'], [10.4, 8.8, 11.6, 8.8, 'wall'],
        [4.5, 0, 4.5, 3.5, 'wall'], [7.4, 0, 7.4, 3.5, 'wall'],
        [0, 3.5, 2.7, 3.5, 'wall'], [3.6, 3.5, 5.4, 3.5, 'wall'], [6.2, 3.5, 7.7, 3.5, 'wall'], [8.55, 3.5, 11.6, 3.5, 'wall'],
        [8.8, 3.5, 8.8, 3.85, 'wall'], [8.8, 4.65, 8.8, 5.0, 'wall'],
        [0, 5.0, 2.2, 5.0, 'wall'], [4.4, 5.0, 11.6, 5.0, 'wall'],
        [6.8, 5.0, 6.8, 5.9, 'wall'], [6.8, 7.8, 6.8, 8.8, 'wall']
      ];
      const subSegs = [];
      WALL_SEGS.forEach(([x0, y0, x1, y1, kind]) => {
        const L = Math.hypot(x1 - x0, y1 - y0);
        const n = Math.max(1, Math.ceil(L / 0.72));
        for (let k = 0; k < n; k++) {
          subSegs.push([lerp(x0, x1, k / n), lerp(y0, y1, k / n), lerp(x0, x1, (k + 1) / n), lerp(y0, y1, (k + 1) / n), kind]);
        }
      });

      const prisms = [];
      const tk = 0.095, wallH = 1.48 * rise;
      const visCnt = Math.max(1, Math.round(subSegs.length * p2d));
      for (let i = 0; i < visCnt; i++) {
        const [x0, y0, x1, y1, kind] = subSegs[i];
        const bx0 = Math.min(x0, x1) - tk, by0 = Math.min(y0, y1) - tk;
        const bx1 = Math.max(x0, x1) + tk, by1 = Math.max(y0, y1) + tk;
        const base = [[bx0, by0], [bx1, by0], [bx1, by1], [bx0, by1]];
        const dp = depth((bx0 + bx1) / 2, (by0 + by1) / 2);
        if (kind === 'wall') {
          prisms.push({ base, z0: 0, z1: wallH, top: C.navy, cA: '#CBD5E1', cB: '#94A3B8', strokeTop: C.navy, alpha: 1, d: dp });
        } else {
          if (rise > 0.02) {
            prisms.push({ base, z0: 0, z1: 0.42 * rise, top: C.navy, cA: '#CBD5E1', cB: '#94A3B8', strokeTop: null, alpha: 1, d: dp - 0.001 });
          }
          prisms.push({ base, z0: 0.42 * rise, z1: 1.40 * rise, top: '#BAE6FD', cA: 'rgba(125,211,252,0.72)', cB: 'rgba(56,189,248,0.62)', strokeTop: C.blue, alpha: 1, d: dp });
        }
      }

      if (rise > 0.03) {
        const FURN = [
          [0.45, 0.45, 2.25, 2.05, 0.46, '#DBEAFE', '#BFDBFE', '#93C5FD'],
          [4.85, 0.42, 6.85, 1.30, 0.50, '#E0F2FE', '#BAE6FD', '#7DD3FC'],
          [9.35, 0.45, 11.15, 2.05, 0.46, '#DBEAFE', '#BFDBFE', '#93C5FD'],
          [0.50, 6.15, 3.10, 7.05, 0.52, '#BFDBFE', '#93C5FD', '#60A5FA'],
          [1.55, 7.42, 2.85, 8.15, 0.34, '#F1F5F9', '#CBD5E1', '#94A3B8'],
          [7.85, 5.95, 10.65, 6.85, 0.62, '#BBF7D0', '#86EFAC', '#4ADE80']
        ];
        FURN.forEach(([x0, y0, x1, y1, fh, top, cA, cB]) => {
          prisms.push({
            base: [[x0, y0], [x1, y0], [x1, y1], [x0, y1]],
            z0: 0, z1: fh * rise, top, cA, cB, strokeTop: 'rgba(15,23,42,0.18)', alpha: rise * 0.95,
            d: depth((x0 + x1) / 2, (y0 + y1) / 2)
          });
        });
      }

      if (t > 5.0) {
        const aDoor = ease(ph(t, 5.0, 6.0));
        DOORS.forEach(([hx, hy, r, , a1]) => {
          const ex = hx + r * Math.cos(a1), ey = hy + r * Math.sin(a1);
          const nx = -(ey - hy) / r * 0.045, ny = (ex - hx) / r * 0.045;
          prisms.push({
            base: [[hx - nx, hy - ny], [ex - nx, ey - ny], [ex + nx, ey + ny], [hx + nx, hy + ny]],
            z0: 0, z1: 1.28 * rise, top: '#16A34A', cA: '#16A34A', cB: '#15803D', strokeTop: '#15803D', alpha: aDoor,
            d: depth((hx + ex) / 2, (hy + ey) / 2)
          });
        });
      }

      prisms.sort((A, B) => (A.d - B.d) || (A.z0 - B.z0));
      prisms.forEach(pr => {
        ctx.save();
        ctx.globalAlpha = pr.alpha;
        if (morph > 0.02 && pr.z1 - pr.z0 > 0.008) {
          const faces = [0, 1, 2, 3].map(k => {
            const a = pr.base[k], b = pr.base[(k + 1) % 4];
            return { a, b, k, d: depth((a[0] + b[0]) / 2, (a[1] + b[1]) / 2) };
          }).sort((p, q) => p.d - q.d);
          faces.slice(2).forEach(f => {
            const col = f.k % 2 === 0 ? pr.cA : pr.cB;
            poly([P(f.a[0], f.a[1], pr.z0), P(f.b[0], f.b[1], pr.z0), P(f.b[0], f.b[1], pr.z1), P(f.a[0], f.a[1], pr.z1)], col, 'rgba(15,23,42,0.10)', 0.6);
          });
        }
        poly(pr.base.map(p => P(p[0], p[1], pr.z1)), pr.top, pr.strokeTop || pr.top, morph > 0.05 ? 0.9 : 1.1);
        ctx.restore();
      });
    }

    if (t > 4.6) {
      const aLab = ease(ph(t, 4.6, 5.6));
      ctx.save();
      ctx.globalAlpha = aLab;
      const rLabs = [
        ['침실 1', '4.5×3.5m', 1.85, 1.95],
        ['욕실', '2.9×3.5m', 5.95, 1.95],
        ['침실 2', '4.2×3.5m', 9.85, 1.95],
        ['중앙 복도 (문 3곳)', '', 4.35, 4.30],
        ['현관', '', 10.35, 4.30],
        ['거실', '6.8×3.8m', 4.55, 7.25],
        ['주방 · 식당', '4.8×3.8m', 9.25, 7.65]
      ];
      rLabs.forEach(([nm, dm, lx, ly]) => {
        const pt = P(lx, ly, 0.72 * rise);
        const label = dm && morph < 0.55 ? `${nm} (${dm})` : nm;
        const w = tw(ctx, label, 12.0, 800) + 16;
        box(ctx, pt[0] - w / 2, pt[1] - 12, w, 22, 'rgba(255,255,255,0.92)', '#CBD5E1', 11, 1);
        T(ctx, label, pt[0], pt[1] + 3.5, 12.0, C.ink, 900, 'center');
      });
      ctx.restore();
    }

    T(ctx, '━━ 복원 벽체 (2D → 3D)     ▭ 채광 창호     ⌒ 문 열림 · 개방 동선', cx + cw / 2, cy + ch - 16, 12.2, C.sub, 700, 'center');

    // 3. Right Panel: Similarity Score Comparison & Audit Verdict
    const px = 1056, pw = 344;
    box(ctx, px, 48, pw, 504, '#FFFFFF', C.line, 0);
    box(ctx, px, 48, pw, 42, C.navy, null, 0);
    T(ctx, '설계도 복원 정확도 검수', px + 18, 75, 16, '#FFFFFF', 900);

    const checks = [
      ['방 개수 · 문 3곳 연결 위상 일치', t > 4.2],
      ['벽체 길이 · 면적 비율 정합', t > 6.4],
      ['2D 평면도 → 3D 입체 공간 확장', t > 9.4]
    ];
    checks.forEach(([s, ok], i) => {
      const yy = 104 + i * 52;
      box(ctx, px + 16, yy, pw - 32, 42, ok ? C.greenS : C.bg, ok ? C.greenB : C.line, 0);
      T(ctx, (ok ? '✓ ' : '· ') + s, px + 26, yy + 27, 13.5, ok ? C.green : C.mute, 800);
    });

    // Similarity Score Bars
    box(ctx, px + 16, 270, pw - 32, 152, '#F8FAFC', C.line, 0);
    T(ctx, '모델별 도면 유사도 (Similarity)', px + 26, 294, 13.3, C.ink, 800);
    const bars = [
      ['3.8 Flash', 38.6, '#94A3B8', C.mute],
      ['4 Argon', 54.4, '#60A5FA', C.sub],
      ['4 Carbon', 58.6, C.navy, C.navy]
    ];
    bars.forEach(([m, sc, col, fg], idx) => {
      const by_ = 314 + idx * 34;
      const g = ease(ph(t, 4.8 + idx * 0.7, 7.0 + idx * 0.7));
      T(ctx, m, px + 26, by_ + 15, 13, fg, idx === 2 ? 900 : 700);
      box(ctx, px + 108, by_ + 4, 134, 13, '#E5E7EB', null, 6);
      box(ctx, px + 108, by_ + 4, 134 * (sc / 70) * g, 13, col, null, 6);
      T(ctx, `${sc}%`, px + pw - 26, by_ + 15, 13, fg, 900, 'right');
    });

    if (t >= 10.4) {
      callout(ctx, px + 16, 438, pw - 32, 96, '✓ 유사도 58.6% (1위)', '2D 평면 복원 → 3D 디지털 트윈 직결', 'green', ph(t, 10.4, 11.0));
    }
  }

  // ==========================================================================
  // 10. GraphWalks — 1,000-Page Tile Matrix + 4-Hop Causal Arcs
  // ==========================================================================
  const CLUES = [
    [18, '18쪽 · 불량 접수 대장', '문제 로트 = #LOT-774'],
    [340, '340쪽 · 조립 투입 이력', '#LOT-774 부품 = 밸브 V-19'],
    [690, '690쪽 · 협력사 구매 원장', '밸브 V-19 납품 = K-정밀 3공장'],
    [940, '940쪽 · 현장 품질 감사록', '3공장 3차 열처리 온도 이탈!']
  ];
  function drawGraph(ctx, t) {
    const read = 1000 * ease(ph(t, 0.4, 9.6));
    const found = CLUES.filter(c => read >= c[0]).length;
    chips(ctx, ['1,000쪽 전체 스캔', '앞 단서 기억 (18→340쪽)', '뒤 단서 추적 (690→940쪽)', '근본 원인 확정'], t > 10.2 ? 4 : found >= 3 ? 2 : found >= 1 ? 1 : 0);

    const gx = 0, gy = 48, cols = 50, tw_ = 16.8, th_ = 21.5, gp = 3;
    const pos = n => {
      const i = n - 1;
      return [gx + (i % cols) * (tw_ + gp), gy + 34 + Math.floor(i / cols) * (th_ + gp)];
    };
    T(ctx, `[현업 비유] 스캔 문서  ${Math.round(read)} / 1,000쪽 (약 80만 토큰)`, gx, gy + 20, 15.5, C.navy, 900);
    T(ctx, '256k~1M 그래프 다중 홉 탐색(BFS)을 제조 문서 추적에 대입한 비유', gx + 448, gy + 20, 14, C.mute, 700);

    for (let n = 1; n <= 1000; n++) {
      const [x, y] = pos(n);
      const isClue = CLUES.some(c => c[0] === n);
      let col = n <= read ? '#C7D9F8' : '#EEF2F7';
      if (Math.abs(n - read) < 12 && read < 1000) col = C.blue;
      if (isClue && n <= read) col = C.red;
      box(ctx, x, y, tw_, th_, col, null, 2);
    }

    for (let i = 1; i < found; i++) {
      const [ax, ay] = pos(CLUES[i - 1][0]), [bx, by] = pos(CLUES[i][0]);
      const p = ph(read, CLUES[i][0], CLUES[i][0] + 45);
      ctx.save();
      ctx.strokeStyle = C.red; ctx.lineWidth = 3.6;
      ctx.shadowColor = 'rgba(220,38,38,0.45)'; ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(ax + tw_ / 2, ay + th_ / 2);
      const mx = lerp(ax, bx, p), my = lerp(ay, by, p);
      ctx.quadraticCurveTo((ax + mx) / 2 + 54, (ay + my) / 2 - 38, mx + tw_ / 2, my + th_ / 2);
      ctx.stroke();
      ctx.restore();
    }

    CLUES.forEach(([n]) => {
      if (read >= n) {
        const [x, y] = pos(n);
        ctx.beginPath(); ctx.arc(x + tw_ / 2, y + th_ / 2, 14, 0, Math.PI * 2);
        ctx.strokeStyle = C.red; ctx.lineWidth = 2.8; ctx.stroke();
        const ty = n <= 50 ? y + th_ + 5 : y - 24;
        box(ctx, x + tw_ / 2 - 26, ty, 52, 20, C.red, null, 10);
        T(ctx, `${n}쪽`, x + tw_ / 2, ty + 14.5, 12, '#FFFFFF', 900, 'center');
      }
    });

    const px = 1012, pw = 388;
    box(ctx, px, 48, pw, 504, '#FFFFFF', C.line, 0);
    box(ctx, px, 48, pw, 42, C.soft, C.line, 0);
    T(ctx, '다중 홉(BFS) 4단계 비유 (96.2% · 1위)', px + 18, 75, 16, C.navy, 900);
    CLUES.forEach(([n, h, s], i) => {
      const yy = 104 + i * 84, on = read >= n;
      box(ctx, px + 16, yy, pw - 32, 68, on ? '#FEF2F2' : C.bg, on ? C.redB : C.line, 0);
      T(ctx, `단서 ${i + 1}`, px + 28, yy + 25, 12.5, on ? C.red : C.mute, 900);
      T(ctx, h, px + 88, yy + 25, 12.5, on ? C.sub : C.mute, 700);
      T(ctx, on ? s : '문서 탐색 대기…', px + 28, yy + 52, 16.5, on ? C.ink : '#9CA3AF', 900);
      if (i < 3) T(ctx, '↓', px + pw / 2, yy + 80, 14, on ? C.red : '#D1D5DB', 900, 'center');
    });
    if (t > 10.2) {
      callout(ctx, px + 16, 444, pw - 32, 92, '✓ 초장문 다중 홉 탐색 96.2% (1위)', '현업 비유: K-정밀 3공장 열처리 이탈 원인 확정', 'green', ph(t, 10.2, 10.8));
    }
  }

  // ==========================================================================
  // 11. RiemannBench — 7-Line Lyapunov Proof + Damped Robot Arm + Phase Spiral
  // ==========================================================================
  const MATH = [
    ['문제', 'ẍ + 2ζωẋ + ω²x = 0   (ζ, ω > 0 · 전역 점근 안정성 증명)', C.mute],
    ['1단계', 'V(x, ẋ) = ½ẋ² + ½ω²x²   (에너지 범함수 정의)', C.ink],
    ['2단계', 'V̇ = ẋ·ẍ + ω²x·ẋ         (시간 미분 전개)', C.ink],
    ['3단계', '  = ẋ(−2ζωẋ − ω²x) + ω²x·ẋ', C.ink],
    ['4단계', '  = −2ζω·ẋ²  ≤ 0         (교차항 소거 · V 비증가)', C.ink],
    ['검산', 'V̇ = 0 ⇒ ẋ ≡ 0 ⇒ ẍ = −ω²x = 0 ⇒ x = 0 ✓', C.green],
    ['결론', 'LaSalle 불변 원리 → 원점(목표 각도)으로 전역 점근 수렴 ∎', C.navy]
  ];
  function drawMath(ctx, t) {
    const n = Math.min(MATH.length, Math.floor(t / 1.15) + 1);
    chips(ctx, ['지배방정식 설정', '시간 미분 전개', 'LaSalle 조건 검산', '수렴 증명 완결'], n >= 7 ? 4 : n >= 6 ? 2 : n >= 2 ? 1 : 0);

    box(ctx, 0, 48, 646, 504, '#FFFFFF', C.line, 0);
    box(ctx, 0, 48, 646, 42, C.soft, C.line, 0);
    T(ctx, '[현업 R&D 비유] 리아푸노프 미분방정식 엄밀 증명 예시', 18, 75, 16, C.navy, 900);

    MATH.slice(0, n).forEach(([lab, s, col], i) => {
      const yy = 106 + i * 62, a = ph(t, i * 1.15, i * 1.15 + 0.38);
      ctx.save();
      ctx.globalAlpha = a;
      box(ctx, 18, yy, 78, 32, lab === '검산' ? C.greenS : lab === '결론' ? C.soft : C.card, null, 16);
      T(ctx, lab, 57, yy + 21, 13, lab === '검산' ? C.green : lab === '결론' ? C.navy : C.sub, 900, 'center');
      T(ctx, s, 110, yy + 22, 17.5, col, 700, 'left', i >= 1 && i <= 4 ? MONO : FONT);
      ctx.restore();
    });

    // Center: Damped Robotic Arm
    const ax = 666, aw = 334;
    box(ctx, ax, 48, aw, 504, '#FFFFFF', C.line, 0);
    T(ctx, '정밀 로봇 팔 감쇠 제어', ax + 20, 82, 16.5, C.ink, 900);
    const tau = Math.max(0, t - 0.8) * 1.15;
    const x = 1.08 * Math.exp(-0.34 * tau) * Math.cos(2.2 * tau);
    const bx = ax + aw / 2, by = 458, L = 212, ang = -Math.PI / 2 + x * 0.88;
    ctx.save(); ctx.setLineDash([6, 5]); ctx.strokeStyle = '#16A34A'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx, by - L - 22); ctx.stroke(); ctx.restore();
    T(ctx, '목표 수직선', bx, by - L - 30, 13, C.green, 800, 'center');
    for (let k = 1; k <= 12; k++) {
      const tt = Math.max(0, tau - k * 0.06), xx = 1.08 * Math.exp(-0.34 * tt) * Math.cos(2.2 * tt), aa = -Math.PI / 2 + xx * 0.88;
      ctx.beginPath(); ctx.arc(bx + L * Math.cos(aa), by + L * Math.sin(aa), 7.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(26,115,232,${0.18 - k * 0.013})`; ctx.fill();
    }
    ctx.save();
    ctx.lineCap = 'round'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 16;
    ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + L * Math.cos(ang), by + L * Math.sin(ang)); ctx.stroke();
    ctx.restore();
    ctx.beginPath(); ctx.arc(bx + L * Math.cos(ang), by + L * Math.sin(ang), 13, 0, Math.PI * 2); ctx.fillStyle = C.navy; ctx.fill();
    box(ctx, bx - 56, by, 112, 36, '#475569', null, 4);
    ctx.beginPath(); ctx.arc(bx, by, 14, 0, Math.PI * 2); ctx.fillStyle = '#0F172A'; ctx.fill();

    // Right: Phase Portrait Spiral
    const qx = 1020, qw = 380;
    box(ctx, qx, 48, qw, 504, '#FFFFFF', C.line, 0);
    T(ctx, '위상 궤적 (위치 x × 속도 ẋ)', qx + 20, 82, 16.5, C.ink, 900);
    const ox = qx + qw / 2, oy = 290, sc = 114;
    ctx.strokeStyle = '#E5E7EB'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(qx + 20, oy); ctx.lineTo(qx + qw - 20, oy); ctx.moveTo(ox, 108); ctx.lineTo(ox, 430); ctx.stroke();
    ctx.beginPath();
    for (let k = 0; k <= 280; k++) {
      const tt = tau * k / 280;
      const xx = 1.08 * Math.exp(-0.34 * tt) * Math.cos(2.2 * tt);
      const vv = 1.08 * Math.exp(-0.34 * tt) * (-0.34 * Math.cos(2.2 * tt) - 2.2 * Math.sin(2.2 * tt)) / 2.2;
      const px = ox + xx * sc, py = oy - vv * sc;
      k ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
    }
    ctx.strokeStyle = C.navy; ctx.lineWidth = 3; ctx.stroke();
    ctx.beginPath(); ctx.arc(ox, oy, 7, 0, Math.PI * 2); ctx.fillStyle = '#16A34A'; ctx.fill();
    pill(ctx, ox + 12, oy + 8, '수렴 원점', 'rgba(230,244,234,0.96)', C.green, 12, 22);

    if (t > 8.8) {
      callout(ctx, qx + 16, 444, qw - 32, 90, '✓ 연구급 수리 추론 80.0% (1위)', '현업 비유: 부호 오차 없이 제어기 목표 각도 수렴', 'green', ph(t, 8.8, 9.4));
    }
  }

  // ==========================================================================
  // 12. Terminal-Bench-Science 0.1 — Heated Rod Heatmap + 5-Run Curve Fitting
  // ==========================================================================
  const FIT_RUNS = [[20, 18.0], [31, 9.4], [38, 3.1], [41.6, 0.9], [42.0, 0.3]];
  const rodModel = (x, h) => 25 + 175 * Math.exp(-x * Math.sqrt(h) / 26);
  const ROD_MEAS = Array.from({ length: 13 }, (_, i) => [i * 2.5, rodModel(i * 2.5, 42) + [2, -3, 1, 3, -2, 2, -1, 1, -2, 1, 0, -1, 1][i]]);
  function drawFit(ctx, t) {
    const per = 2.1, run = Math.min(FIT_RUNS.length - 1, Math.floor(Math.max(0, t - 0.6) / per));
    const p = ease(ph(t, 0.6 + run * per, 0.6 + run * per + 0.85));
    const hPrev = run ? FIT_RUNS[run - 1][0] : 12;
    const h = lerp(hPrev, FIT_RUNS[run][0], t < 0.6 ? 0 : p);
    const err = t < 0.6 ? 24 : lerp(run ? FIT_RUNS[run - 1][1] : 24, FIT_RUNS[run][1], p);
    chips(ctx, ['시뮬레이터 실행', '실험실 센서값과 대조', '계수 보정 · 재실행', '오차 0.3% 정밀 일치'], err < 1 ? 4 : run >= 1 ? 2 : t > 0.6 ? 1 : 0);

    box(ctx, 0, 48, 932, 504, '#FFFFFF', C.line, 0);
    T(ctx, '가열 금속 막대 열전달 분포 & 실측 센서 피팅 (Python SciPy 솔버)', 24, 82, 17, C.ink, 900);
    const rx = 74, rw = 820;
    for (let k = 0; k < 82; k++) {
      const v = (rodModel((k / 82) * 30, h) - 25) / 175;
      ctx.fillStyle = `rgb(${Math.round(255 * Math.min(1, v * 1.6))},${Math.round(80 + 120 * (1 - Math.abs(v - 0.5) * 2))},${Math.round(255 * (1 - v))})`;
      ctx.fillRect(rx + (k * rw) / 82, 98, rw / 82 + 1, 28);
    }
    T(ctx, '열분포', rx - 10, 118, 12.5, C.mute, 800, 'right');

    const cx = 74, cy = 152, cw = 820, ch = 364;
    const X = x => cx + (cw * x) / 30, Y = v => cy + ch - (ch * (v - 20)) / 190;
    ctx.strokeStyle = '#E5E7EB'; ctx.lineWidth = 1;
    [50, 100, 150, 200].forEach(v => {
      ctx.beginPath(); ctx.moveTo(cx, Y(v)); ctx.lineTo(cx + cw, Y(v)); ctx.stroke();
      T(ctx, v + '°C', cx - 10, Y(v) + 5, 12, C.mute, 700, 'right');
    });
    [0, 10, 20, 30].forEach(x => T(ctx, x + ' cm', X(x), cy + ch + 22, 12, C.mute, 700, 'center'));

    for (let r = 0; r < run; r++) {
      ctx.beginPath();
      for (let k = 0; k <= 60; k++) {
        const x = k / 2, py = Y(rodModel(x, FIT_RUNS[r][0]));
        k ? ctx.lineTo(X(x), py) : ctx.moveTo(X(x), py);
      }
      ctx.strokeStyle = 'rgba(148,163,184,0.45)'; ctx.lineWidth = 2; ctx.stroke();
    }
    ctx.beginPath();
    for (let k = 0; k <= 60; k++) {
      const x = k / 2, py = Y(rodModel(x, h));
      k ? ctx.lineTo(X(x), py) : ctx.moveTo(X(x), py);
    }
    ctx.strokeStyle = err < 1 ? '#16A34A' : err < 6 ? '#F59E0B' : C.red;
    ctx.lineWidth = 4; ctx.stroke();

    ROD_MEAS.forEach(([x, v]) => {
      ctx.beginPath(); ctx.arc(X(x), Y(v), 6, 0, Math.PI * 2); ctx.fillStyle = C.ink; ctx.fill();
    });
    T(ctx, '● 실험실 센서 측정값(13점)    ━ 현재 시뮬레이션 곡선    ─ 이전 시도', cx + cw, cy + 4, 13, C.mute, 700, 'right');

    const px = 958, pw = 442;
    box(ctx, px, 48, pw, 504, '#FFFFFF', C.line, 0);
    T(ctx, '실측 데이터 대비 평균 오차(RMSE)', px + 24, 84, 16, C.mute, 800);
    T(ctx, err.toFixed(1) + '%', px + 24, 148, 56, err < 1 ? C.green : err < 6 ? C.amber : C.red, 900);
    box(ctx, px + 24, 168, pw - 48, 13, C.card, null, 6);
    box(ctx, px + 24, 168, (pw - 48) * clamp(err / 24), 13, err < 1 ? '#16A34A' : err < 6 ? '#F59E0B' : C.red, null, 6);
    T(ctx, '합격 기준 1.0% 이하', px + 24, 200, 12.5, C.green, 800);

    FIT_RUNS.slice(0, t < 0.6 ? 0 : run + 1).forEach(([hh, e], i) => {
      const yy = 220 + i * 50, ok = e < 1;
      box(ctx, px + 20, yy, pw - 40, 42, ok ? C.greenS : C.bg, ok ? C.greenB : C.line, 0);
      T(ctx, `실행 ${i + 1}`, px + 34, yy + 27, 14.5, C.navy, 900);
      T(ctx, `열전달 계수 h = ${hh}`, px + 108, yy + 27, 14.5, C.sub, 700);
      T(ctx, `오차 ${e}%`, px + pw - 34, yy + 27, 14.5, ok ? C.green : C.red, 900, 'right');
    });
    if (t > 10.6) {
      callout(ctx, px + 20, 478, pw - 40, 62, '✓ 실측과 99.7% 일치 (64.8% · 1위)', null, 'green', ph(t, 10.6, 11.1));
    }
  }

  // ==========================================================================
  // 13. SEC-bench Pro — 3-File Cross-Module Call-Graph Security Taint Tracer
  // ==========================================================================
  function drawSec(ctx, t) {
    const st = t > 8.8 ? 4 : t > 6.2 ? 3 : t > 3.6 ? 2 : t > 1.2 ? 1 : 0;
    chips(ctx, ['단순 키워드 검색 한계 확인', '진입점 입력값 추적', '다중 파일 호출 사슬 연결', '숨은 권한 우회 적출'], st);

    // Top Contrast Banner: Grep vs Call-Graph
    box(ctx, 0, 48, 976, 54, C.card, C.line, 0);
    pill(ctx, 16, 61, '일반 키워드 검색 (grep "admin")', '#E5E7EB', C.sub, 12.5, 28);
    T(ctx, '→ 0건 탐지 실패 (문법 오류 없음)', 248, 80, 14, C.mute, 700);
    pill(ctx, 510, 61, 'Carbon 함수 호출 그래프 추적', C.soft, C.navy, 12.5, 28);
    T(ctx, '→ 3개 파일 너머 오염 경로 끝까지 추적', 738, 80, 14, C.navy, 800);

    const files = [
      {
        title: '1. api/gateway.go (외부 진입)',
        lines: ['func HandleOrder(req *Request) {', '  hdr := req.Header["X-Compat"]', '  ctx := NewSession(req, hdr)', '  return billing.Query(ctx)', '}'],
        hi: 1, trig: 1.2, badge: '오염 헤더 유입점', warn: false
      },
      {
        title: '2. auth/legacy_hdr.go (중간 분기)',
        lines: ['func NewSession(r *Req, h string) {', '  s := VerifyJWT(r.Token)', '  if h == "v1_mobile" {', '    s.Role = ROLE_SUPER_ADMIN', '  } // 구형 호환 코드 악용!'],
        hi: 3, trig: 3.8, badge: '⚠ 인증 검증 우회!', warn: true
      },
      {
        title: '3. db/invoice_store.go (최종 유출)',
        lines: ['func Query(ctx *Session) []Row {', '  if ctx.Role == ROLE_SUPER_ADMIN {', '    return db.DumpAllTenants()', '  }', '}'],
        hi: 2, trig: 6.4, badge: '⚠ 전사 원장 유출!', warn: true
      }
    ];

    files.forEach((f, i) => {
      const fx = i * 332, fy = 118, fw = 312, fh = 326;
      const active = t >= f.trig;
      winFrame(ctx, fx, fy, fw, fh, f.title, true);
      f.lines.forEach((ln, li) => {
        const ly = fy + 68 + li * 38;
        if (active && li === f.hi) {
          box(ctx, fx + 12, ly - 20, fw - 24, 30, f.warn ? 'rgba(239,68,68,0.28)' : 'rgba(59,130,246,0.28)', f.warn ? C.red : '#60A5FA', 3, 1.2);
        }
        T(ctx, ln, fx + 20, ly, 13.5, (active && li === f.hi) ? (f.warn ? '#FCA5A5' : '#93C5FD') : '#CBD5E1', (active && li === f.hi) ? 800 : 500, 'left', MONO);
      });
      if (active) {
        pill(ctx, fx + 16, fy + fh - 44, f.badge, f.warn ? C.red : C.blue, '#FFFFFF', 13, 28);
      }
      if (i < 2 && t > f.trig + 1.2) {
        arrow(ctx, fx + fw + 2, fy + 166, fx + 330, fy + 166, C.red, 3);
      }
    });

    // Bottom Taint Flow Summary Bar
    box(ctx, 0, 460, 976, 92, '#FFFFFF', C.line, 0);
    T(ctx, '함수 호출 사슬:  gateway.HandleOrder()  ──▶  auth.NewSession("v1_mobile")  ──▶  db.DumpAllTenants()', 22, 496, 15, C.ink, 800, 'left', MONO);
    T(ctx, '개별 파일만 보면 정상 코드처럼 보이지만, 48,600줄 전체 호출 길을 따라가 숨은 관리자 승격 구멍을 출시 전에 차단합니다.', 22, 530, 14.5, C.sub, 700);

    // Right Audit Verdict Column
    const rx = 1000, rw = 400;
    box(ctx, rx, 48, rw, 504, '#FFFFFF', C.line, 0);
    box(ctx, rx, 48, rw, 42, C.navy, null, 0);
    T(ctx, '출시 전 보안 감사 결과', rx + 18, 75, 16, '#FFFFFF', 800);

    [['검사 대상 코드', '312개 파일 · 48,600줄'], ['탐지 취약점 등급', 'Critical (관리자 권한 탈취)'], ['공격 재현 조건', 'X-Compat: v1_mobile 헤더 1줄'], ['자동 생성 패치안', '구형 분기 제거 + JWT 강제 검증']].forEach(([k, v], idx) => {
      const cy = 110 + idx * 74, show = t > 2.0 + idx * 1.7;
      box(ctx, rx + 16, cy, rw - 32, 60, show ? C.bg : '#FFFFFF', C.line, 0);
      T(ctx, k, rx + 28, cy + 23, 12.5, C.mute, 800);
      T(ctx, show ? v : '분석 중…', rx + 28, cy + 47, 15, idx === 1 && show ? C.red : C.ink, 800);
    });

    if (t > 8.6) {
      callout(ctx, rx + 16, 422, rw - 32, 112, '✓ 취약점 탐지 88.2% (1위)', '다중 파일 호출 맥락 추적으로 선제 차단', 'green', ph(t, 8.6, 9.2));
    }
  }

  // ==========================================================================
  // 14. ExploitGym — Air-Gapped Sandbox Live Red-Dot PoC Attack & Breach Arena
  // ==========================================================================
  function drawExploit(ctx, t) {
    const st = t > 8.2 ? 4 : t > 5.2 ? 3 : t > 2.2 ? 2 : t > 0.6 ? 1 : 0;
    chips(ctx, ['격리 타깃 컨테이너 기동', '취약 경로 · 제약 조건 분석', '모의 해킹(PoC) 타격 · 보정', '침투 실증 완료 (54.8% · 1위)'], st);

    // 1. Left: Vulnerable CVE Target Service inside Isolated Docker
    winFrame(ctx, 0, 48, 388, 504, '검증 대상 타깃 (webhook_deser.py)');
    pill(ctx, 14, 94, 'Docker --network=none (외부망 완전 차단)', C.soft, C.navy, 12, 24);

    box(ctx, 14, 128, 360, 226, '#F8FAFC', C.border, 0);
    T(ctx, 'def handle_webhook(req):', 26, 158, 12.8, C.ink, 800, 'left', MONO);
    T(ctx, '  # 관문 1: 타임스탬프 유효성 검사', 26, 185, 12.2, C.mute, 600);
    T(ctx, '  if expired(req.hdr["X-TS"]):', 26, 209, 12.5, C.sub, 700, 'left', MONO);
    T(ctx, '    return 400', 26, 231, 12.5, C.sub, 700, 'left', MONO);
    T(ctx, '  # 관문 2: 바디 CRC16 오프셋 검증', 26, 259, 12.2, C.mute, 600);
    T(ctx, '  if not crc16_ok(req.raw): return 422', 26, 283, 12.4, C.sub, 700, 'left', MONO);
    if (t > 1.8) box(ctx, 20, 300, 348, 40, '#FEF2F2', C.red, 0, 1.6);
    T(ctx, '  return legacy_deser.loads(req.body)', 26, 325, 12.6, t > 1.8 ? C.redDark : C.ink, 800, 'left', MONO);

    box(ctx, 14, 370, 360, 166, '#FFFFFF', C.line, 0);
    box(ctx, 14, 370, 360, 32, C.card, null, 0);
    T(ctx, '단순 자동 스캐너가 막히는 2중 방어 관문', 26, 391, 13.2, C.ink, 800);
    T(ctx, '• 유효한 타임스탬프 헤더 서명 필요 (400 차단)', 26, 426, 12.6, C.sub, 700);
    T(ctx, '• 4바이트 오프셋 CRC16 체크섬 일치 필요 (422 차단)', 26, 456, 12.6, C.sub, 700);
    T(ctx, '→ Carbon이 맞춤 PoC 공격 패킷을 생성 · 정밀 타격', 26, 496, 12.8, C.navy, 800);

    // 2. Center: Dark Cyber Sandbox — Live Red-Dot Attack Arena + PoC Terminal
    winFrame(ctx, 404, 48, 588, 504, 'poc_repro.py — 격리 샌드박스 모의 공격 타격 시뮬레이터', true);

    const ax = 418, ay = 92, aw = 560, ah = 248;
    box(ctx, ax, ay, aw, ah, '#0B1120', '#334155', 4, 1.4);

    // Subtle tactical radar grid inside attack stage
    ctx.save();
    ctx.strokeStyle = 'rgba(51,65,85,0.42)';
    ctx.lineWidth = 1;
    for (let gx = ax + 32; gx < ax + aw; gx += 32) {
      ctx.beginPath(); ctx.moveTo(gx, ay + 30); ctx.lineTo(gx, ay + ah); ctx.stroke();
    }
    for (let gy = ay + 58; gy < ay + ah; gy += 32) {
      ctx.beginPath(); ctx.moveTo(ax, gy); ctx.lineTo(ax + aw, gy); ctx.stroke();
    }
    ctx.restore();

    // Arena Top Status Strip
    box(ctx, ax, ay, aw, 30, '#111827', '#1E293B', 0, 1);
    const wave2 = t >= 5.3;
    const recal = t >= 4.4 && t < 5.3;
    const breached = t >= 6.3;

    ctx.beginPath();
    ctx.arc(ax + 16, ay + 15, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = recal ? '#60A5FA' : '#EF4444';
    ctx.fill();
    const statusTxt = wave2
      ? '2차 정밀 레드 패킷 집중 타격 ──▶ 2중 관문 연속 관통!'
      : recal
        ? '오프셋 에러 분석 ──▶ pack_crc16(offset=4) 공격 패킷 재장전…'
        : t >= 1.1
          ? '1차 PoC 패킷 공격 발사 ──▶ 관문 2 (CRC16 422) 방어벽 충돌'
          : '격리 컨테이너 타깃 포트(8080) 조준 완료';
    T(ctx, statusTxt, ax + 28, ay + 20, 12.2, wave2 ? '#FCA5A5' : recal ? '#93C5FD' : '#E2E8F0', 800);

    const sentCnt = wave2 ? 12 + Math.round(16 * ph(t, 5.3, 8.4)) : Math.round(12 * ph(t, 1.1, 4.2));
    T(ctx, breached ? `패킷 ${sentCnt}발 · 관통 성공` : `공격 패킷 ${sentCnt}발`, ax + aw - 12, ay + 20, 11.8, breached ? '#FDE047' : '#FCA5A5', 800, 'right', MONO);

    const cy = 222;
    const g1x = 612, g2x = 746, tx = 842, tw_ = 124;

    // Helper for glowing red attack dots with crimson comet streak
    function redDot(px, py, trail, r, hot) {
      ctx.save();
      const grad = ctx.createLinearGradient(px - trail, py, px, py);
      grad.addColorStop(0, 'rgba(239,68,68,0)');
      grad.addColorStop(1, hot ? 'rgba(239,68,68,0.72)' : 'rgba(248,113,113,0.48)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = r * 1.45;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(px - trail, py);
      ctx.lineTo(px, py);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(px, py, r * 2.0, 0, Math.PI * 2);
      ctx.fillStyle = hot ? 'rgba(220,38,38,0.30)' : 'rgba(239,68,68,0.20)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fillStyle = hot ? '#EF4444' : '#F87171';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(px, py, r * 0.42, 0, Math.PI * 2);
      ctx.fillStyle = '#FFE4E6';
      ctx.fill();
      ctx.restore();
    }

    // Gate 1 & Gate 2 Top Labels
    T(ctx, '관문 1: X-TS', g1x, 143, 11.8, '#93C5FD', 800, 'center');
    T(ctx, '관문 2: CRC16', g2x, 143, 11.8, wave2 ? '#FCA5A5' : '#FCD34D', 800, 'center');

    // Gate 1 Vertical Barrier (x = 604..620, aperture at cy - 22 .. cy + 22 once t >= 1.3)
    const g1Open = t >= 1.3;
    if (g1Open) {
      box(ctx, g1x - 7, 152, 14, 46, '#1E293B', '#38BDF8', 2, 1.4);
      box(ctx, g1x - 7, 246, 14, 46, '#1E293B', '#38BDF8', 2, 1.4);
    } else {
      box(ctx, g1x - 7, 152, 14, 140, '#1E293B', '#64748B', 2, 1.4);
    }

    // Gate 2 Vertical Barrier (solid shield during Wave 1; breached open in Wave 2)
    if (wave2) {
      box(ctx, g2x - 7, 152, 14, 44, '#2A1215', '#EF4444', 2, 1.6);
      box(ctx, g2x - 7, 248, 14, 44, '#2A1215', '#EF4444', 2, 1.6);
      // Crimson breach glow inside Gate 2 gap
      box(ctx, g2x - 9, 198, 18, 48, 'rgba(239,68,68,0.18)', null, 0);
    } else {
      const hitGlow = t >= 2.1 && t < 4.8;
      box(ctx, g2x - 7, 152, 14, 140, hitGlow ? '#450A0A' : '#1E293B', hitGlow ? '#EF4444' : '#F59E0B', 2, hitGlow ? 2.0 : 1.5);
    }

    // Left Attack Launcher Node (Carbon PoC Emitter)
    box(ctx, 430, 162, 104, 120, '#181826', recal ? '#60A5FA' : '#EF4444', 4, 1.8);
    T(ctx, 'Carbon PoC', 482, 190, 12.5, '#FCA5A5', 900, 'center');
    T(ctx, 'poc_repro.py', 482, 214, 11.5, '#F8FAFC', 700, 'center', MONO);
    pill(ctx, 443, 228, wave2 ? 'v2 offset=4' : 'v1 초안', wave2 ? '#7F1D1D' : '#1E293B', wave2 ? '#FCA5A5' : '#FCD34D', 10.5, 22);
    // Glowing Muzzle Node
    ctx.beginPath();
    ctx.arc(534, cy, 8, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(239,68,68,0.32)';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(534, cy, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = '#EF4444';
    ctx.fill();

    // Right Target Sink Core (webhook_deser.py -> legacy_deser.loads)
    box(ctx, tx, 156, tw_, 132, breached ? 'rgba(127,29,29,0.52)' : '#0F172A', breached ? '#EF4444' : '#64748B', 6, breached ? 2.4 : 1.5);
    // Target crosshair rings inside Sink Core
    const tcx = tx + tw_ / 2, tcy = 204;
    ctx.save();
    ctx.strokeStyle = breached ? 'rgba(248,113,113,0.65)' : 'rgba(148,163,184,0.30)';
    ctx.lineWidth = 1.3;
    [16, 28].forEach(rr_ => {
      ctx.beginPath(); ctx.arc(tcx, tcy, rr_, 0, Math.PI * 2); ctx.stroke();
    });
    ctx.beginPath();
    ctx.moveTo(tcx - 34, tcy); ctx.lineTo(tcx + 34, tcy);
    ctx.moveTo(tcx, tcy - 34); ctx.lineTo(tcx, tcy + 34);
    ctx.stroke();
    ctx.restore();
    T(ctx, breached ? '● 타깃 관통!' : '핵심 Sink', tcx, 254, 13, breached ? '#FCA5A5' : '#CBD5E1', 900, 'center');
    T(ctx, breached ? '200 OK 실증' : 'loads(body)', tcx, 275, 11.5, breached ? '#FDE047' : '#94A3B8', 800, 'center', MONO);

    // Flank Naive Scanner Probes (blocked at Gate 1 upper/lower wall)
    if (t >= 0.9) {
      const fp = ph(t, 0.9, 1.8);
      [168, 180, 264, 276].forEach((fy, fi) => {
        const fx = lerp(538, g1x - 22, clamp(fp * 1.15 - fi * 0.08));
        ctx.beginPath();
        ctx.arc(fx, fy, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(248,113,113,0.65)';
        ctx.fill();
        if (fp >= 0.9) T(ctx, '✕', g1x - 12, fy + 3.5, 9.5, '#F87171', 800, 'center');
      });
    }

    // WAVE 1: Red Attack Dots Slamming into Gate 2 & Ricocheting (t = 1.1 .. 4.7)
    if (t >= 1.1 && !wave2) {
      for (let k = 0; k < 10; k++) {
        const raw = (t - 1.1) * 0.95 - k * 0.14;
        if (raw < 0) continue;
        const u = raw % 1;
        const laneY = cy + ((k % 3) - 1) * 10 + Math.sin(k * 1.7 + u * 4) * 3;
        if (u < 0.78) {
          const px = lerp(538, g2x - 11, u / 0.78);
          redDot(px, laneY, 18, 4.6, false);
        } else {
          // Ricochet backward sparks off Gate 2 shield!
          const ru = (u - 0.78) / 0.22;
          const dirY = (k % 2 === 0 ? -1 : 1) * (12 + (k % 3) * 8);
          const rx_ = (g2x - 11) - ru * 28;
          const ry_ = laneY + ru * dirY;
          ctx.beginPath();
          ctx.arc(rx_, ry_, 3.2 * (1 - ru * 0.4), 0, Math.PI * 2);
          ctx.fillStyle = '#FCA5A5';
          ctx.fill();
        }
      }
      if (t >= 2.0 && t < 4.7) {
        const pulse = ((t * 2.4) % 1);
        ctx.save();
        ctx.strokeStyle = `rgba(239,68,68,${(1 - pulse) * 0.85})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(g2x - 8, cy, 8 + pulse * 24, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }

    // WAVE 2 (and Settled Frame t = D): Precision Red Attack Swarm Piercing BOTH Gates into Target Core!
    if (wave2) {
      // Glowing crimson breach trajectory beam
      ctx.save();
      ctx.strokeStyle = 'rgba(239,68,68,0.24)';
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.moveTo(536, cy);
      ctx.lineTo(tcx, tcy);
      ctx.stroke();

      ctx.setLineDash([7, 5]);
      ctx.strokeStyle = 'rgba(248,113,113,0.75)';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(536, cy);
      ctx.lineTo(tcx, tcy);
      ctx.stroke();
      ctx.restore();

      // 14 glowing crimson attack dots streaming across & frozen in-flight at t = D!
      const N = 14;
      for (let k = 0; k < N; k++) {
        const elapsedW2 = (t - 5.3) * 0.82;
        if (elapsedW2 < k * 0.06) continue;
        const u = (elapsedW2 + k / N) % 1;
        const baseY = lerp(cy, tcy, u);
        const spread = Math.sin(k * 2.3 + u * 6.2) * (1 - u * 0.45) * 13;
        const px = lerp(542, tcx - 4, u);
        const py = baseY + spread;
        redDot(px, py, 24, 5.0, true);
      }

      // Red breach shockwave & hit nodes on Target Sink Core
      if (breached) {
        const p1 = ((t * 1.9) % 1);
        const p2 = ((t * 1.9 + 0.5) % 1);
        ctx.save();
        [p1, p2].forEach(pp => {
          ctx.strokeStyle = `rgba(239,68,68,${(1 - pp) * 0.9})`;
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.arc(tcx, tcy, 8 + pp * 28, 0, Math.PI * 2);
          ctx.stroke();
        });
        ctx.beginPath();
        ctx.arc(tcx, tcy, 6.5, 0, Math.PI * 2);
        ctx.fillStyle = '#EF4444';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(tcx, tcy, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#FEF08A';
        ctx.fill();
        ctx.restore();
      }
    }

    // Bottom Stage Captions under the 4 Arena Columns
    T(ctx, '공격 패킷 발사', 482, 322, 11.5, '#CBD5E1', 700, 'center');
    T(ctx, g1Open ? '✓ 서명 통과' : '서명 검증', g1x, 322, 11.5, g1Open ? '#7DD3FC' : '#94A3B8', 800, 'center');
    T(ctx, wave2 ? '▶ 오프셋 돌파!' : (t >= 2.0 ? '✕ 422 차단' : '체크섬 검증'), g2x, 322, 11.5, wave2 ? '#FCA5A5' : (t >= 2.0 ? '#F87171' : '#94A3B8'), 800, 'center');
    T(ctx, breached ? '✓ 침투 입증!' : '타깃 보호 중', tcx, 322, 11.5, breached ? '#FDE047' : '#94A3B8', 800, 'center');

    // Lower Compact PoC Synthesis & Execution Log Strip
    box(ctx, ax, 350, aw, 190, '#090D16', '#1E293B', 4, 1.2);
    const termLines = [
      [1.2, '[1차 공격] $ python3 poc_repro.py --target http://sandbox:8080/hook', '#E2E8F0'],
      [2.2, '  ✕ HTTP 422 Blocked: CRC16 header offset mismatch (관문 2 차단)', '#FCA5A5'],
      [4.4, '[2차 보정] payload = pack_crc16(offset=4, canary_probe_token)', '#93C5FD'],
      [5.5, '  ✓ HTTP 200 OK · CANARY_PROVEN: /tmp/sandbox_flag_8841', '#FDE047']
    ];
    termLines.forEach(([lt, txt, col], idx) => {
      if (t >= lt) T(ctx, txt, ax + 14, 374 + idx * 23, 12.2, col, 700, 'left', MONO);
    });

    if (t >= 6.8) {
      const a = ph(t, 6.8, 7.4);
      ctx.save();
      ctx.globalAlpha = a;
      box(ctx, ax + 12, 458, aw - 24, 70, '#052E16', '#22C55E', 4, 1.8);
      T(ctx, '✓ 격리 샌드박스 내 실제 침투 가능성 입증 완료', ax + 26, 484, 13.8, '#86EFAC', 900);
      T(ctx, '외부 네트워크 영향 0건 · 재현 증빙 스크립트(poc_repro.py) 확보', ax + 26, 510, 12.2, '#CBD5E1', 700);
      ctx.restore();
    }

    // 3. Right: Defensive Verification Report & Benchmark Verdict
    const rx = 1008, rw = 392;
    box(ctx, rx, 48, rw, 504, '#FFFFFF', C.line, 0);
    box(ctx, rx, 48, rw, 42, C.navy, null, 0);
    T(ctx, '방어 목적 모의 해킹 실증 리포트', rx + 18, 75, 16, '#FFFFFF', 900);

    const cards = [
      ['1. 코드 제약 조건 역산', '타임스탬프 · CRC16 관문 해독', '단순 스캐너가 막힌 심층 경로 도달', 1.8],
      ['2. 자율 공격 패킷 보정', '1차 422 차단 후 오프셋 즉시 수정', '2차 정밀 타격으로 카나리 토큰 실증', 5.4],
      ['3. 보안 패치 증빙 전달', '작동하는 PoC 재현 코드 첨부', '15번 CWE-bench 보안 패치 연계', 7.0]
    ];
    cards.forEach(([title, l1, l2, trig], idx) => {
      const cy_ = 104 + idx * 104, ok = t >= trig;
      box(ctx, rx + 16, cy_, rw - 32, 90, ok ? '#F8FAFC' : C.bg, ok ? C.greenB : C.line, 0, 1.4);
      T(ctx, (ok ? '✓ ' : '· ') + title, rx + 28, cy_ + 26, 14.5, ok ? C.green : C.mute, 900);
      T(ctx, ok ? l1 : '샌드박스 검증 대기…', rx + 28, cy_ + 52, 13.4, ok ? C.ink : C.mute, 700);
      if (ok) T(ctx, l2, rx + 28, cy_ + 74, 12.6, C.sub, 600);
    });

    if (t >= 8.0) {
      callout(ctx, rx + 16, 434, rw - 32, 98, '✓ 침투 실증 54.8% (1위)', '4 Argon(42.0%) · GPT-6(42.4%) 상회', 'green', ph(t, 8.0, 8.6));
    }
  }

  // ==========================================================================
  // 15. CWE-bench — Live Zero-Downtime Security Patch & Dual-Traffic Split Gate
  // ==========================================================================
  function drawCWE(ctx, t) {
    const patched = t >= 3.2;
    const st = t > 9.0 ? 4 : t > 5.8 ? 3 : patched ? 2 : 1;
    chips(ctx, ['취약 코드 SQLi 약점 확인', '파라미터 바인딩 패치 작성', '보안 테스트: 공격 40건 차단', '기능 테스트: 정상 500건 통과'], st);

    // Left: Incoming Mixed Live Traffic
    box(ctx, 0, 48, 390, 504, '#FFFFFF', C.line, 0);
    box(ctx, 0, 48, 390, 42, C.card, C.line, 0);
    T(ctx, '검증 테스트 입력 (공격 + 정상 요청)', 18, 75, 16, C.ink, 800);

    // Top Attack Stream Card
    box(ctx, 18, 112, 354, 182, '#FEF2F2', C.redB, 0, 1.6);
    pill(ctx, 32, 128, 'SQL 인젝션 공격 (40건)', C.red, '#FFFFFF', 13, 26);
    ["' OR 1=1 --", 'UNION SELECT card_no FROM pay', "admin'-- 주석 우회 로그인"].forEach((s, i) => {
      box(ctx, 32, 168 + i * 36, 326, 28, '#FFFFFF', C.redB, 4, 1);
      T(ctx, s, 44, 187 + i * 36, 13, C.redDark, 700, 'left', MONO);
    });

    // Bottom Normal Customer Stream Card
    box(ctx, 18, 324, 354, 206, C.soft, '#93C5FD', 0, 1.6);
    pill(ctx, 32, 340, '정상 기능 요청 (500건)', C.navy, '#FFFFFF', 13, 26);
    ["외국인 고객 로그인 (O'Connor)", '장바구니 쿠폰 · 분할 결제 승인', '기업 구매팀 대량 주문 업로드'].forEach((s, i) => {
      box(ctx, 32, 382 + i * 42, 326, 32, '#FFFFFF', '#BFDBFE', 4, 1);
      T(ctx, s, 44, 403 + i * 42, 14, C.ink, 700);
    });

    // Center: Hot-Patched Production Server Gate
    const gx = 446, gw = 492;
    winFrame(ctx, gx, 48, gw, 504, 'search_checkout.py — 보안 패치 작성 · 테스트 검증', true);
    T(ctx, '기존 취약 코드 (문자열 단순 결합)', gx + 20, 112, 13.5, '#94A3B8', 700);
    box(ctx, gx + 20, 122, gw - 40, 40, 'rgba(239,68,68,0.20)', '#EF4444', 4, 1);
    T(ctx, '- sql = "SELECT * FROM users WHERE name=\'" + inp + "\'"', gx + 30, 147, 12.2, '#FCA5A5', 600, 'left', MONO);

    if (t > 1.8) {
      const a = ph(t, 1.8, 2.6);
      ctx.save(); ctx.globalAlpha = a;
      T(ctx, 'Carbon 안전 패치 (쿼리 구조 분리 · O\'Connor 정상 허용!)', gx + 20, 194, 13.5, '#86EFAC', 800);
      box(ctx, gx + 20, 204, gw - 40, 68, 'rgba(34,197,94,0.18)', '#22C55E', 4, 1.4);
      T(ctx, '+ sql = "SELECT * FROM users WHERE name = $1"', gx + 32, 231, 14, '#86EFAC', 700, 'left', MONO);
      T(ctx, '+ rows = db.QueryBound(ctx, sql, [inp])', gx + 32, 256, 14, '#86EFAC', 700, 'left', MONO);
      ctx.restore();
    }

    // Gate Shield Graphic inside Center Panel
    box(ctx, gx + 20, 298, gw - 40, 102, '#1E293B', patched ? '#22C55E' : '#64748B', 6, 2);
    T(ctx, patched ? '✓ SQL 인젝션 구문 무력화 확인' : '패치 코드 테스트 검증 중…', gx + 40, 336, 16.5, patched ? '#4ADE80' : '#CBD5E1', 900);
    T(ctx, '공격 구문은 일반 문자열로 처리되어 쿼리 구조 변경 불가', gx + 40, 366, 14, '#E2E8F0', 600);
    T(ctx, '특수문자 포함 고객 성명(O\'Connor) · 결제는 오차단 없이 통과', gx + 40, 388, 13.5, '#93C5FD', 600);

    box(ctx, gx + 20, 420, gw - 40, 110, '#0F172A', '#334155', 6, 1);
    const blkCnt = Math.round(40 * ease(ph(t, 3.4, 8.2)));
    const okCnt = Math.round(500 * ease(ph(t, 3.4, 8.6)));
    T(ctx, `공격 방어 테스트:  ${blkCnt} / 40 차단`, gx + 36, 458, 15.5, '#FCA5A5', 800, 'left', MONO);
    T(ctx, `정상 회귀 테스트:  ${okCnt} / 500 통과`, gx + 36, 492, 15.5, '#86EFAC', 800, 'left', MONO);
    T(ctx, '기존 기능 회귀: 0건', gx + gw - 36, 476, 15, '#FDE047', 900, 'right');

    // Animated Packets between Left -> Center -> Right
    if (patched) {
      for (let k = 0; k < 4; k++) {
        const u = ((t * 0.7 + k * 0.25) % 1);
        // Red packet hits left edge of Center Gate and stops!
        if (t < 8.8) {
          const rx_ = lerp(374, gx + 8, Math.min(1, u * 1.4));
          ctx.beginPath(); ctx.arc(rx_, 200 + (k % 2) * 18, 7, 0, Math.PI * 2);
          ctx.fillStyle = C.red; ctx.fill();
        }
        // Blue packet glides all the way across to Right!
        if (t < 8.8) {
          const bx_ = u < 0.5 ? lerp(374, gx + 20, u * 2) : lerp(gx + gw - 20, 994, (u - 0.5) * 2);
          ctx.beginPath(); ctx.arc(bx_, 424 + (k % 2) * 20, 7, 0, Math.PI * 2);
          ctx.fillStyle = C.blue; ctx.fill();
        }
      }
    }

    // Right: Outcomes
    const rx = 994, rw = 406;
    box(ctx, rx, 48, rw, 504, '#FFFFFF', C.line, 0);
    box(ctx, rx, 48, rw, 42, C.greenS, C.greenB, 0);
    T(ctx, '패치 검증 결과 (71.0% · 1위)', rx + 18, 75, 16, C.green, 900);

    box(ctx, rx + 18, 112, rw - 36, 176, patched ? C.greenS : C.bg, patched ? C.greenB : C.line, 0, 1.8);
    T(ctx, '✓ 보안 테스트 통과', rx + 34, 156, 22, patched ? C.green : C.mute, 900);
    T(ctx, 'OR 조건 · UNION · 주석 우회 변형', rx + 34, 192, 15, C.sub, 700);
    T(ctx, '40 / 40건 차단 · DB 유출 0건', rx + 34, 222, 15.5, C.ink, 800);

    box(ctx, rx + 18, 314, rw - 36, 216, patched ? C.greenS : C.bg, patched ? C.greenB : C.line, 0, 1.8);
    T(ctx, '✓ 기능 테스트 통과', rx + 34, 358, 22, patched ? C.green : C.mute, 900);
    T(ctx, '로그인 · 검색 · 결제 · 환불 500건 전량 정상', rx + 34, 396, 15, C.sub, 700);
    T(ctx, '보안을 고치느라 정상 기능을 망가뜨리지 않음', rx + 34, 426, 15, C.ink, 800);
    if (t > 8.6) {
      pill(ctx, rx + 34, 462, '탐지(13) → 검증(14) → 안전 패치(15) 완결', C.navy, '#FFFFFF', 13.5, 32);
    }
  }

  // ==========================================================================
  // Registry & 1-Shot Non-Looping RAF Driver (Plays once to D, replayable via R)
  // ==========================================================================
  const SHOWS = {
    aa: [drawAA, 9.0],
    vals: [drawVals, 9.6],
    swe: [drawSWE, 9.8],
    term: [drawTerm, 11.8],
    desktop: [drawDesktop, 12.2],
    auto: [drawAuto, 9.8],
    vending: [drawVending, 11.6],
    chart: [drawChart, 9.4],
    plan: [drawPlan, 12.2],
    graph: [drawGraph, 11.2],
    math: [drawMath, 9.8],
    fit: [drawFit, 11.4],
    sec: [drawSec, 9.6],
    exploit: [drawExploit, 26.0],
    cwe: [drawCWE, 9.4]
  };
  window.SHOWS = SHOWS;

  let curCanvas = null;
  let start = performance.now();
  let settledKey = '';
  let frozenSec = null;

  window.showReplay = function () {
    frozenSec = null;
    start = performance.now();
    settledKey = '';
  };

  window.showSettle = function () {
    frozenSec = null;
    curCanvas = document.querySelector('.slide.active canvas[data-show]');
    start = performance.now() - 40000;
    settledKey = '';
  };

  window.showAt = function (sec, freeze) {
    curCanvas = document.querySelector('.slide.active canvas[data-show]');
    frozenSec = freeze ? sec : null;
    start = performance.now() - sec * 1000;
    settledKey = '';
  };

  function loop(now) {
    const c = document.querySelector('.slide.active canvas[data-show]');
    if (c !== curCanvas) {
      curCanvas = c;
      frozenSec = null;
      start = now;
      settledKey = '';
    }
    if (c) {
      const entry = SHOWS[c.dataset.show];
      const wrap = c.parentElement;
      if (entry && wrap) {
        const [fn, D] = entry;
        const W = wrap.clientWidth, H = wrap.clientHeight;
        const dpr = window.devicePixelRatio || 1;
        if (W > 40 && H > 40) {
          const targetW = Math.round(W * dpr), targetH = Math.round(H * dpr);
          const elapsed = frozenSec !== null ? frozenSec : Math.max(0, (now - start) / 1000);
          const t = Math.min(elapsed, D);
          const key = `${c.dataset.show}:${targetW}:${targetH}`;

          if (!(elapsed >= D && settledKey === key)) {
            if (elapsed >= D) settledKey = key;
            if (c.width !== targetW || c.height !== targetH) {
              c.width = targetW;
              c.height = targetH;
            }
            const ctx = c.getContext('2d');
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, W, H);
            const s = Math.min(W / AW, H / AH);
            const ox = (W - AW * s) / 2, oy = (H - AH * s) / 2;
            ctx.save();
            ctx.translate(ox, oy);
            ctx.scale(s, s);
            fn(ctx, t);
            ctx.restore();
          }
        }
      }
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
