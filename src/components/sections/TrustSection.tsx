"use client";

export function TrustSection() {
  const clients = [
    { name: "TechCorp", type: "Enterprise SaaS" },
    { name: "MediTech", type: "Healthcare Platform" },
    { name: "GlobalFin", type: "Fintech Architecture" },
    { name: "AILabs", type: "AI Infrastructure" },
    { name: "Nexus", type: "Logistics Dashboard" },
  ];

  return (
    <section className="relative overflow-hidden py-20">
      <div className="container mx-auto max-w-7xl px-6 pb-8">
        <h2 className="text-center text-md font-semibold tracking-widest text-white/40 mb-10 uppercase">
          Trusted by modern companies scaling globally
        </h2>
      </div>

      <div className="relative overflow-hidden">


        <div className="trust-marquee">
          <div className="trust-marquee__track">
            {[0, 1, 2].map((groupIndex) => (
              <div
                key={groupIndex}
                className="trust-marquee__group"
                aria-hidden={groupIndex !== 0}
              >
                {clients.map((client, i) => (
                  <div
                    key={`${groupIndex}-${client.name}-${i}`}
                    className="trust-item"
                  >
                    <div className="trust-item__name">{client.name}</div>
                    <div className="trust-item__type">{client.type}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .trust-marquee {
          width: 100%;
          overflow: hidden;
        }

        .trust-marquee__track {
          display: flex;
          width: max-content;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          animation: trust-scroll 24s linear infinite;
        }

        .trust-marquee__group {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .trust-item {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 2rem;
          opacity: 0.5;
          transition: opacity 0.3s ease;
          cursor: default;
          text-align: center;
        }

        .trust-item:hover {
          opacity: 1;
        }

        .trust-item__name {
          margin-bottom: 0.25rem;
          font-size: 1.5rem;
          line-height: 1;
          font-weight: 700;
          letter-spacing: -0.04em;
          color: white;
          white-space: nowrap;
        }

        .trust-item__type {
          font-size: 0.75rem;
          line-height: 1rem;
          letter-spacing: 0.02em;
          color: rgba(255, 255, 255, 0.5);
          white-space: nowrap;
        }

        @keyframes trust-scroll {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-33.3333%, 0, 0);
          }
        }

        @media (min-width: 768px) {
          .trust-item {
            padding: 0 4rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .trust-marquee__track {
            animation: none;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}