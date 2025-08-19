import { useState, useEffect } from "react";
import { UserData } from "../../models/UserData";
import { Link, useNavigate } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import { auth } from "../../services/firebaseConnection";
import { signOut } from "firebase/auth";

export default function Header() {
  const [user, setUser] = useState<UserData | null>(null);
  const navigate = useNavigate();

  //store userData
  useEffect(() => {
    const userDetail = localStorage.getItem("@detailUser");
    if (userDetail) {
      const parsed = JSON.parse(userDetail);
      setUser(parsed);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  async function logout() {
    localStorage.clear();
    await signOut(auth);
  }

  return (
    <header id="Header" className="header-dark d-flex p-3 bg-success shadow mb-3">
      <div className="col justify-content-center">
        <Link to={'/'}>
          <h1>
            Shopping Cart <Icon.Cart2 />
          </h1>
        </Link>
      </div>
      <div className="d-flex flex-row-reverse align-items-center">
        <button onClick={logout} className="btn rounded p-1">
          <Icon.DoorClosedFill />
        </button>
        <p className="my-0 mx-2">
          {user?.email}
        </p>
      </div>
    </header>
  );
}
