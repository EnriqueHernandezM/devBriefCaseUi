import React from "react";

export default function AdminAccessModal({
  copy,
  onClose,
  onExplore,
  onSignIn,
}) {
  React.useEffect(() => {
    const closeWithEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", closeWithEscape);
    return () => window.removeEventListener("keydown", closeWithEscape);
  }, [onClose]);

  return (
    <div className="adminAccessOverlay" onMouseDown={onClose}>
      <section
        className="adminAccessModal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-access-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="adminAccessClose"
          onClick={onClose}
          aria-label={copy.close}
        >
          x
        </button>
        <p className="adminAccessEyebrow">{copy.title}</p>
        <h2 id="admin-access-title">{copy.description}</h2>
        <p className="adminAccessText">{copy.supportingText}</p>
        <div className="adminAccessActions">
          <button
            type="button"
            className="adminAccessPrimary"
            onClick={onExplore}
          >
            {copy.explore}
          </button>
          <button
            type="button"
            className="adminAccessSecondary"
            onClick={onSignIn}
          >
            {copy.signIn}
          </button>
        </div>
      </section>
    </div>
  );
}
