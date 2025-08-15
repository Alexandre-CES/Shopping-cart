import { useState, useEffect } from "react";
import { UserData } from "../../Types/UserData";
import { useNavigate } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import { auth } from "../../firebaseConnection";
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
  }, []);

  async function logout() {
    localStorage.clear();
    await signOut(auth);
  }

  return (
    <header className="header-dark d-flex p-3 bg-success">
      <div className="col justify-content-center">
        <h1>
          Shopping Cart <Icon.Cart2 />
        </h1>
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
