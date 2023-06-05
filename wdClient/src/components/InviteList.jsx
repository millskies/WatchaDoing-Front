import { useState } from "react";
import CreateInviteList from "./CreateInviteList";

export default function InviteList() {
    const [showCreateList, setShowCreateList] = useState(false);

    function toggleCreateList() {
        showCreateList ? setShowCreateList(false) : setShowCreateList(true);
    }

  return (
    <div id="InviteList">
        <button
        className="btn btn-outline-primary"
        onClick={(e) => {
          e.preventDefault();
          toggleCreateList();
        }}
      >
        {!showCreateList ? <img style={{ width: "20px" }} src="plus.png" alt="create event" /> : <img style={{ width: "20px" }} src="minus.png" alt="roll up create event" />}
      </button>
      {showCreateList && <CreateInviteList/>}
      <div>
        {}
      </div>
    </div>
  )
}
