import React, { useState, useEffect, useCallback } from "react";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import "react-web-tabs/dist/react-web-tabs.css";
import axios from "axios";
import {
  MdPhoneCallback,
  MdMoreVert,
  MdCall,
  MdPhoneMissed,
  MdKeyboardVoice,
} from "react-icons/md";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Modal } from "react-bootstrap";

import { Link } from "react-router-dom";

import "../src/css/callog.css";

//import { useNavigate } from 'react-router-dom';

const Tabsview = () => {
  const [callListTab, setCallListTab] = useState(false);
  const [whichtab, setWhichtab] = useState(false);
  const [callmodal, setCallmodal] = useState(false);
  const [callLists, setCallLists] = useState([]);
  const [callid, setCallid] = useState(null);
  //let navigate = useNavigate();

  useEffect(() => {
    console.log("use effect archive flag ", callListTab);
    axios
      .get("https://aircall-job.herokuapp.com/activities")
      .then((response) => {
        setCallLists(response.data);
      });
  }, [callListTab]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = (mlist, status) => {
    console.log("before archive flag ", callListTab);
    setAnchorEl(null);
    if (mlist === "archive" || mlist === "unarchive") {
      setCallListTab(status);
      axios({
        method: "post",
        url: "https://aircall-job.herokuapp.com/activities/" + callid,
        data: {
          is_archived: status,
        },
        headers: { "content-type": "application/json" },
      }).then((response) => {
        console.log("response ", response.status);
        console.log("after response ", response.data);
        if (response.status == 200) {
          setCallListTab(!status);
        }
      });
    } else {
    }
  };

  const handleClick = (event) => {
    setCallid(event.currentTarget.id);
    setAnchorEl(event.currentTarget);
  };

  function CallData(props) {
    console.log("props", props.direction, props.from);
    return (
      <div>
        {props.direction === "outbound" ? (
          <div className="clallist">
            <div className="lefticon">
              <MdPhoneCallback size="20px" color="grey" />
            </div>
            <div className="callname">
              {props.to} <br />
              <div className="subcallname">from {props.from}</div>
            </div>
            <div>
              <MdMoreVert
                id={props.id}
                size="20px"
                color="grey"
                onClick={handleClick}
              />
            </div>
          </div>
        ) : (
          <div className="clallist">
            <div className="lefticon">
              <MdPhoneCallback size="20px" color="grey" />
            </div>
            <div className="callname">
              {props.from} <br />
              <div className="subcallname">from {props.to}</div>
            </div>
            <div>
              <MdMoreVert size="20px" color="grey" onClick={handleClick} />
            </div>
          </div>
        )}

        <Menu
          keepMounted
          anchorEl={anchorEl}
          onClose={handleClose}
          open={Boolean(anchorEl)}
        >
          <MenuItem
            id={`menu${props.index}`}
            onClick={() => handleClose("view")}
          >
            <Link to="/calldetail" state={{ from: props.from, to: props.to }}>
              View
            </Link>
          </MenuItem>
          {props.is_archived === false ? (
            <MenuItem onClick={() => handleClose("archive", true)}>
              Archive call
            </MenuItem>
          ) : (
            <MenuItem onClick={() => handleClose("unarchive", false)}>
              UnArchive call
            </MenuItem>
          )}
        </Menu>
      </div>
    );
  }

  const callList = (callflag) => {
    if (whichtab === false) {
      return (
        <div className="">
          {callLists &&
            callLists
              .filter((calldata) => calldata.is_archived === callflag)
              .map((data, index) => {
                const timeval = new Date(data.created_at).toLocaleTimeString(
                  "en",
                  { timeStyle: "short", hour12: true, timeZone: "UTC" }
                );

                return (
                  <div>
                    {data.direction === "outbound" ? (
                      <div className="clallist">
                        <div className="lefticon">
                          <MdPhoneCallback size="20px" color="grey" />
                        </div>
                        <div className="callname">
                          {data.to} <br />
                          <div className="subcallname">
                            from {data.from}
                          </div>{" "}
                          <div className="subcallname">
                            type {data.call_type}
                            {data.call_type == "missed" ? (
                              <MdPhoneMissed size="15px" color="red" />
                            ) : data.call_type == "answered" ? (
                              <MdCall size="15px" color="green" />
                            ) : data.call_type == "voicemail" ? (
                              <MdKeyboardVoice size="15px" color="green" />
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </div>
                        <div className="timeclass">{timeval}</div>
                        <div>
                          <MdMoreVert
                            id={data.id}
                            size="20px"
                            color="grey"
                            onClick={handleClick}
                          />
                        </div>
                      </div>
                    ) : (
                      <div id={data.id} className="clallist">
                        <div className="lefticon">
                          <MdPhoneCallback size="20px" color="grey" />
                        </div>
                        <div className="callname">
                          {data.from} <br />
                          <div className="subcallname">from {data.to}</div>
                          <div className="subcallname">
                            type {data.call_type}
                            {data.call_type == "missed" ? (
                              <MdPhoneMissed size="15px" color="red" />
                            ) : data.call_type == "answered" ? (
                              <MdCall size="15px" color="green" />
                            ) : data.call_type == "voicemail" ? (
                              <MdKeyboardVoice size="15px" color="green" />
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </div>
                        <div className="timeclass">{timeval}</div>
                        <div>
                          <MdMoreVert
                            id={data.id}
                            size="20px"
                            color="grey"
                            onClick={handleClick}
                          />
                        </div>
                      </div>
                    )}

                    <Menu
                      keepMounted
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      open={Boolean(anchorEl)}
                    >
                      {data.is_archived === false ? (
                        <MenuItem onClick={() => handleClose("archive", true)}>
                          Archive call
                        </MenuItem>
                      ) : (
                        <MenuItem
                          onClick={() => handleClose("unarchive", false)}
                        >
                          UnArchive call
                        </MenuItem>
                      )}
                    </Menu>
                  </div>
                );
              })}
        </div>
      );
    }
  };

  const archiveList = (callflag) => {
    if (whichtab === true) {
      return (
        <div>
          {callLists &&
            callLists
              .filter((calldata) => calldata.is_archived === callflag)
              .map((data, index) => {
                const timeval = new Date(data.created_at).toLocaleTimeString(
                  "en",
                  { timeStyle: "short", hour12: true, timeZone: "UTC" }
                );
                return (
                  <div>
                    {data.direction === "outbound" ? (
                      <div className="clallist">
                        <div className="lefticon">
                          <MdPhoneCallback size="20px" color="grey" />
                        </div>
                        <div className="callname">
                          {data.to} <br />
                          <div className="subcallname">
                            from {data.from}
                          </div>{" "}
                          <div className="subcallname">
                            type {data.call_type}
                            {data.call_type == "missed" ? (
                              <MdPhoneMissed size="15px" color="red" />
                            ) : data.call_type == "answered" ? (
                              <MdCall size="15px" color="green" />
                            ) : data.call_type == "voicemail" ? (
                              <MdKeyboardVoice size="15px" color="green" />
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </div>
                        <div className="timeclass">{timeval}</div>
                        <div>
                          <MdMoreVert
                            id={data.id}
                            size="20px"
                            color="grey"
                            onClick={handleClick}
                          />
                        </div>
                      </div>
                    ) : (
                      <div id={data.id} className="clallist">
                        <div className="lefticon">
                          <MdPhoneCallback size="20px" color="grey" />
                        </div>
                        <div className="callname">
                          {data.from} <br />
                          <div className="subcallname">from {data.to}</div>
                          <div className="subcallname">
                            type {data.call_type}
                            {data.call_type == "missed" ? (
                              <MdPhoneMissed size="15px" color="red" />
                            ) : data.call_type == "answered" ? (
                              <MdCall size="15px" color="green" />
                            ) : data.call_type == "voicemail" ? (
                              <MdKeyboardVoice size="15px" color="green" />
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </div>
                        <div className="timeclass">{timeval}</div>
                        <div>
                          <MdMoreVert
                            id={data.id}
                            size="20px"
                            color="grey"
                            onClick={handleClick}
                          />
                        </div>
                      </div>
                    )}
                    {console.log("in second ", data.is_archived)}
                    <Menu
                      keepMounted
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      open={Boolean(anchorEl)}
                    >
                      {data.is_archived === false ? (
                        <MenuItem onClick={() => handleClose("archive", true)}>
                          Archive call
                        </MenuItem>
                      ) : (
                        <MenuItem
                          onClick={() => handleClose("unarchive", false)}
                        >
                          UnArchive call
                        </MenuItem>
                      )}
                    </Menu>
                  </div>
                );
              })}
        </div>
      );
    }
  };

  const firstTab = () => {
    setWhichtab(false);
  };

  const secondTab = () => {
    setWhichtab(true);
  };

  return (
    <div>
      <Tabs
        defaultTab="one"
        onChange={(tabId) => {
          console.log(tabId);
        }}
      >
        <TabList>
          <Tab tabFor="one" onClick={() => firstTab()}>
            Call Lists
          </Tab>
          <Tab tabFor="two" onClick={() => secondTab()}>
            Archived Calls
          </Tab>
        </TabList>
        <TabPanel tabId="one">{callList(false)}</TabPanel>
        <TabPanel tabId="two">{archiveList(true)}</TabPanel>
      </Tabs>
    </div>
  );
};

export default Tabsview;
