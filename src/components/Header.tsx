export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <img
          className="schneider-logo"
          src={`${import.meta.env.BASE_URL}schneider-green.png`}
          alt="Schneider Electric"
        />
      </div>
    </header>
  );
}
