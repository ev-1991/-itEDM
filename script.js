(() => {
  "use strict";

  const slides = [...document.querySelectorAll(".slide")];
  const dots = [...document.querySelectorAll(".slider-dots button")];
  const prev = document.querySelector(".slider-prev");
  const next = document.querySelector(".slider-next");
  const hero = document.querySelector(".hero");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let active = 0;
  let timer;
  let stormReady = false;

  function showSlide(index) {
    const previous = active;
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle("is-active", i === active));
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === active);
      dot.setAttribute("aria-current", i === active ? "true" : "false");
    });
    if (stormReady && previous !== active && !reduceMotion) {
      window.setTimeout(() => triggerLightning(Math.random() > .65 ? 2 : 1), 280);
    }
  }

  function restartSlider() {
    window.clearInterval(timer);
    timer = window.setInterval(() => showSlide(active + 1), 6500);
  }

  prev?.addEventListener("click", () => { showSlide(active - 1); restartSlider(); });
  next?.addEventListener("click", () => { showSlide(active + 1); restartSlider(); });
  dots.forEach((dot, index) => dot.addEventListener("click", () => { showSlide(index); restartSlider(); }));
  hero?.addEventListener("mouseenter", () => window.clearInterval(timer));
  hero?.addEventListener("mouseleave", restartSlider);
  showSlide(0);
  restartSlider();

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  function closeMenu() {
    menuButton?.classList.remove("is-open");
    nav?.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  menuButton?.addEventListener("click", () => {
    const open = !menuButton.classList.contains("is-open");
    menuButton.classList.toggle("is-open", open);
    nav?.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });
  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  document.querySelector("#request-form")?.addEventListener("submit", event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = [
      "Здравствуйте! Заявка с сайта itEDM.",
      "",
      `Имя: ${form.get("name") || ""}`,
      `Телефон: ${form.get("phone") || ""}`,
      `Услуга: ${form.get("service") || ""}`,
      `Задача: ${form.get("message") || ""}`
    ].join("\n");
    window.open(`https://wa.me/77779712555?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  });

  document.querySelectorAll(".service-card").forEach(card => {
    card.addEventListener("pointermove", event => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rx = ((y / rect.height) - .5) * -4;
      const ry = ((x / rect.width) - .5) * 5;
      card.style.setProperty("--card-x", `${x}px`);
      card.style.setProperty("--card-y", `${y}px`);
      card.style.setProperty("--card-rx", `${rx.toFixed(2)}deg`);
      card.style.setProperty("--card-ry", `${ry.toFixed(2)}deg`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--card-rx", "0deg");
      card.style.setProperty("--card-ry", "0deg");
    });
  });

  const canvas = document.querySelector("#network-canvas");
  const ctx = canvas?.getContext("2d");
  const lightningCanvas = document.querySelector("#lightning-canvas");
  const lightningCtx = lightningCanvas?.getContext("2d");
  const stormFlash = document.querySelector(".storm-flash");
  if (!canvas || !ctx || !lightningCanvas || !lightningCtx || !hero) return;

  const pointer = { x: 0, y: 0, active: false };
  let nodes = [];
  let bolts = [];
  let width = 0;
  let height = 0;
  let dpr = 1;
  let animationFrame;
  let lightningFrame;
  let lightningTimer;

  function createNodes() {
    const count = Math.max(28, Math.min(80, Math.round(width / 22)));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - .5) * .34,
      vy: (Math.random() - .5) * .34,
      radius: Math.random() * 1.5 + .7,
      phase: Math.random() * Math.PI * 2
    }));
  }

  function resizeCanvas() {
    const rect = hero.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    lightningCanvas.width = Math.round(width * dpr);
    lightningCanvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    lightningCanvas.style.width = `${width}px`;
    lightningCanvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    lightningCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    createNodes();
  }

  function movePointer(event) {
    const rect = hero.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
    pointer.active = true;
  }

  hero.addEventListener("mousemove", movePointer);
  hero.addEventListener("mouseleave", () => { pointer.active = false; });
  hero.addEventListener("touchmove", event => {
    const touch = event.touches[0];
    if (touch) movePointer(touch);
  }, { passive: true });
  hero.addEventListener("touchend", () => { pointer.active = false; });
  hero.addEventListener("pointerdown", event => {
    if (!event.target.closest("a,button") && !reduceMotion) triggerLightning(1);
  });
  window.addEventListener("resize", resizeCanvas);

  function dnaPoint(x, strand, time) {
    const baseWave = Math.sin(x * .003 + time * .00028) * 16;
    let center = height * .31 + baseWave;
    let influence = 0;
    if (pointer.active) {
      const dx = x - pointer.x;
      influence = Math.exp(-(dx * dx) / (2 * 175 * 175));
      center += (pointer.y - center) * influence * .3;
    }
    const amplitude = 31 + influence * 18;
    const wave = Math.sin(x * .019 - time * .00135);
    return center + (strand === 0 ? wave : -wave) * amplitude;
  }

  function drawDNA(time) {
    const startX = Math.max(width * .32, 380);
    const endX = width + 40;
    if (startX >= endX) return;

    ctx.save();
    ctx.lineCap = "round";
    for (let strand = 0; strand < 2; strand++) {
      ctx.beginPath();
      for (let x = startX; x <= endX; x += 7) {
        const y = dnaPoint(x, strand, time);
        if (x === startX) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      const strandGradient = ctx.createLinearGradient(startX, 0, endX, 0);
      if (strand === 0) {
        strandGradient.addColorStop(0, "rgba(0,184,217,0)");
        strandGradient.addColorStop(.35, "rgba(101,231,255,.18)");
        strandGradient.addColorStop(1, "rgba(101,231,255,.42)");
      } else {
        strandGradient.addColorStop(0, "rgba(132,107,255,0)");
        strandGradient.addColorStop(.35, "rgba(132,107,255,.14)");
        strandGradient.addColorStop(1, "rgba(132,107,255,.34)");
      }
      ctx.strokeStyle = strandGradient;
      ctx.lineWidth = 1.25;
      ctx.shadowBlur = 10;
      ctx.shadowColor = strand === 0 ? "rgba(101,231,255,.4)" : "rgba(132,107,255,.32)";
      ctx.stroke();
    }

    ctx.shadowBlur = 0;
    for (let x = startX; x <= endX; x += 31) {
      const y1 = dnaPoint(x, 0, time);
      const y2 = dnaPoint(x, 1, time);
      const depth = .14 + Math.abs(Math.sin(x * .019 - time * .00135)) * .22;
      ctx.beginPath();
      ctx.moveTo(x, y1);
      ctx.lineTo(x, y2);
      ctx.strokeStyle = `rgba(163,231,255,${depth})`;
      ctx.lineWidth = .7;
      ctx.stroke();

      ctx.fillStyle = "rgba(101,231,255,.65)";
      ctx.beginPath();
      ctx.arc(x, y1, 1.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(163,142,255,.55)";
      ctx.beginPath();
      ctx.arc(x, y2, 1.7, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawNetwork(time = 0) {
    ctx.clearRect(0, 0, width, height);
    drawDNA(time);

    nodes.forEach(node => {
      if (!reduceMotion) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < -10 || node.x > width + 10) node.vx *= -1;
        if (node.y < -10 || node.y > height + 10) node.vy *= -1;

        if (pointer.active) {
          const dx = pointer.x - node.x;
          const dy = pointer.y - node.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 230 && distance > 1) {
            const force = (1 - distance / 230) * .0045;
            node.vx += dx * force;
            node.vy += dy * force;
            const speed = Math.hypot(node.vx, node.vy);
            if (speed > 1.3) {
              node.vx = node.vx / speed * 1.3;
              node.vy = node.vy / speed * 1.3;
            }
          }
        }
      }
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        if (distance < 128) {
          const alpha = (1 - distance / 128) * .28;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(42, 215, 239, ${alpha})`;
          ctx.lineWidth = .75;
          ctx.stroke();
        }
      }
    }

    if (pointer.active) {
      nodes.forEach(node => {
        const distance = Math.hypot(pointer.x - node.x, pointer.y - node.y);
        if (distance < 210) {
          ctx.beginPath();
          ctx.moveTo(pointer.x, pointer.y);
          ctx.lineTo(node.x, node.y);
          ctx.strokeStyle = `rgba(85, 228, 245, ${(1 - distance / 210) * .72})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      const pulse = 7 + Math.sin(time * .004) * 3;
      const glow = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 32);
      glow.addColorStop(0, "rgba(85,228,245,.65)");
      glow.addColorStop(1, "rgba(0,184,217,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(85,228,245,.85)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, pulse, 0, Math.PI * 2);
      ctx.stroke();
    }

    nodes.forEach(node => {
      const shimmer = .46 + Math.sin(time * .002 + node.phase) * .2;
      ctx.fillStyle = `rgba(85,228,245,${shimmer})`;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    animationFrame = requestAnimationFrame(drawNetwork);
  }

  function makeBolt(startX = width * (.55 + Math.random() * .4)) {
    const points = [{ x: startX, y: -18 }];
    let x = startX;
    let y = -18;
    const targetY = height * (.42 + Math.random() * .42);
    while (y < targetY) {
      y += 18 + Math.random() * 24;
      x += (Math.random() - .5) * 42;
      points.push({ x, y });
    }

    const branches = [];
    points.forEach((point, index) => {
      if (index > 2 && index < points.length - 2 && Math.random() > .72) {
        const direction = Math.random() > .5 ? 1 : -1;
        const branch = [{ ...point }];
        let bx = point.x;
        let by = point.y;
        for (let step = 0; step < 3 + Math.floor(Math.random() * 3); step++) {
          bx += direction * (12 + Math.random() * 26);
          by += 13 + Math.random() * 22;
          branch.push({ x: bx, y: by });
        }
        branches.push(branch);
      }
    });

    return {
      points,
      branches,
      born: performance.now(),
      life: 330 + Math.random() * 190
    };
  }

  function drawLine(context, points, color, widthValue) {
    context.beginPath();
    points.forEach((point, index) => {
      if (index === 0) context.moveTo(point.x, point.y);
      else context.lineTo(point.x, point.y);
    });
    context.strokeStyle = color;
    context.lineWidth = widthValue;
    context.stroke();
  }

  function drawLightning(now = performance.now()) {
    lightningCtx.clearRect(0, 0, width, height);
    bolts = bolts.filter(bolt => now - bolt.born < bolt.life);
    bolts.forEach(bolt => {
      const age = (now - bolt.born) / bolt.life;
      const alpha = Math.max(0, 1 - age) * (age < .12 ? 1 : .78);
      lightningCtx.save();
      lightningCtx.lineCap = "round";
      lightningCtx.lineJoin = "round";
      lightningCtx.shadowBlur = 24;
      lightningCtx.shadowColor = `rgba(80,190,255,${alpha})`;
      drawLine(lightningCtx, bolt.points, `rgba(54,148,255,${alpha * .32})`, 8);
      drawLine(lightningCtx, bolt.points, `rgba(198,244,255,${alpha})`, 2.2);
      drawLine(lightningCtx, bolt.points, `rgba(255,255,255,${alpha})`, .8);
      bolt.branches.forEach(branch => {
        drawLine(lightningCtx, branch, `rgba(117,214,255,${alpha * .7})`, 1.1);
      });
      lightningCtx.restore();
    });

    if (bolts.length) lightningFrame = requestAnimationFrame(drawLightning);
  }

  function triggerLightning(amount = 1) {
    if (reduceMotion) return;
    const flashX = 55 + Math.random() * 40;
    stormFlash?.style.setProperty("--flash-x", `${flashX}%`);
    stormFlash?.classList.remove("is-flashing");
    void stormFlash?.offsetWidth;
    stormFlash?.classList.add("is-flashing");
    for (let i = 0; i < amount; i++) {
      bolts.push(makeBolt(width * ((flashX + (Math.random() - .5) * 12) / 100)));
    }
    cancelAnimationFrame(lightningFrame);
    lightningFrame = requestAnimationFrame(drawLightning);
  }

  function scheduleLightning() {
    window.clearTimeout(lightningTimer);
    if (reduceMotion) return;
    lightningTimer = window.setTimeout(() => {
      triggerLightning(Math.random() > .76 ? 2 : 1);
      scheduleLightning();
    }, 4800 + Math.random() * 7200);
  }

  resizeCanvas();
  animationFrame = requestAnimationFrame(drawNetwork);
  stormReady = true;
  scheduleLightning();
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrame);
      cancelAnimationFrame(lightningFrame);
      window.clearTimeout(lightningTimer);
    } else {
      animationFrame = requestAnimationFrame(drawNetwork);
      scheduleLightning();
    }
  });
})();
