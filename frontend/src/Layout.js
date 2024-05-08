import { Outlet } from "react-router-dom";
import './Layout.css';

// We treat `Layout` as the layout of our application.
// The `<Outlet />` delegates renders to the matching child route, if one exists.
function Layout() {
  return (
    <>
      <header>
      <div class="navigation">
                <nav class="topnav">
                    <ul>
                        <li><a href="/">Contracts</a></li>
                        <li><a href="/units">Unit Details</a></li>
                        <li><a href="/new">New Contract</a></li>
                    </ul>
                </nav>
            </div>
        <div id="slogan">
            <h1>Rent-a-Unit</h1>
            <h3>Rent our Units!</h3>
        </div>
      </header>
      <br></br>
      <Outlet />
      <footer>
        <p>©2024 Renting out units since a few days ago.</p>
      </footer>
    </>
  );
}

export default Layout;