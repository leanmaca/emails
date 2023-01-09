import { useEffect, useState } from "react";
import "./App.css";
import {
  AiFillSave,
  AiOutlineFilter,
  AiOutlineRight,
  AiOutlineDown,
} from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { VscCircleLargeFilled } from "react-icons/vsc";
import { MdExpandMore } from "react-icons/md";
import { RxDragHandleDots2 } from "react-icons/rx";
import { MdDragIndicator } from "react-icons/md";
import { useRef } from "react";
import { emails } from "./Data/Data";

function App() {
  const [expand, setExpand] = useState(null);
  const [checkedList, setCheckedList] = useState([]);
  const [data, setData] = useState(emails);
  const [startNumber, setStartNumber] = useState(0);
  const [displayNumber, setDisplayNumber] = useState(50);

  const ref = useRef([]);

  const checkAll = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      for (let i = 0; i < ref.current.length; i++) {
        ref.current[i].checked = true;
      }
    } else {
      for (let i = 0; i < ref.current.length; i++) {
        ref.current[i].checked = false;
      }
    }
  };

  const handleExpand = (i) => {
    if (expand === i) {
      setExpand(null);
    } else {
      setExpand(i);
    }
  };

  const handleCheck = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setCheckedList([...checkedList, value]);
    } else {
      setCheckedList(checkedList.filter((e) => e !== value));
    }
  };

  const handleDelete = (e) => {
    let newEmails = [];
    console.log("length of checked list: " + checkedList.length);
    if (checkedList.length !== 0) {
      console.log("items to delete: " + checkedList);
      for (let i = 0; i < data.length; i++) {
        console.log("counter at " + i);
        for (let j = 0; j < checkedList.length; j++) {
          if (data[i].emailID == checkedList[j]) {
            data.splice(i, 1);
          }
        }
      }
    }
    setData([...data]);
    console.log(data);
    //console.log(checkedList);
    for (let i = 0; i < ref.current.length; i++) {
      ref.current[i].checked = false;
    }
  };

  const handleNext = () => {
    if (displayNumber < data.length) {
      let addStart = startNumber + 50;
      let addDisplay = displayNumber + 50;
      if (addDisplay > data.length) {
        addDisplay = data.length;
      }

      setStartNumber(addStart);
      setDisplayNumber(addDisplay);
    }
  };

  const handlePrevious = () => {
    if (displayNumber > 50) {
      let subtractStart = startNumber - 50;

      let subtractDisplay = displayNumber - 50;
      if (subtractDisplay < 50) {
        subtractDisplay = 50;
      }

      setStartNumber(subtractStart);
      setDisplayNumber(subtractDisplay);
    }
  };

  const Header = () => {
    return (
      <div className="Header">
        <div className="Header-Left">
          <input
            type="checkbox"
            onChange={(e) => {
              checkAll(e);
            }}
          ></input>
          <button className="SaveButton">
            SAVE <AiFillSave />
          </button>
          <button className="FiltersButton">
            MANAGE FILTERS <AiOutlineFilter />
          </button>
          <button
            className="DeleteButton"
            onClick={(e) => {
              handleDelete(e);
            }}
          >
            DELETE <TiDelete />
          </button>
        </div>
        <div className="Header-Right">
          <span
            className="Previous"
            onClick={() => {
              handlePrevious();
            }}
          >
            &lt;
          </span>
          <h5>&nbsp;{displayNumber + " of " + data.length}&nbsp;</h5>

          <span
            className="Next"
            onClick={() => {
              handleNext();
            }}
          >
            &gt;
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="Container">
      <Header />
      <div className="Unread">Unread</div>
      <div className="List">
        {data.slice(startNumber, displayNumber).map((item, i) => (
          <div className="ListItem">
            <div className="ListHeader">
              <div className="Item-Left">
                <div className="Dots">
                  <MdDragIndicator size={18} color="gray" />
                </div>
                <input
                  ref={(element) => {
                    ref.current[i] = element;
                  }}
                  type="checkbox"
                  value={item.emailID}
                  onChange={(e) => handleCheck(e)}
                ></input>
                <VscCircleLargeFilled
                  color="rgba(105,177,121,255)"
                  className="Circle"
                />
                <div className="Datebox">
                  <div className="Datebox-Day">
                    {item.date.substring(item.date.length - 2)}
                  </div>
                  <div className="Datebox-Month">
                    {item.date.substring(5, 8)}
                  </div>
                </div>
                <div className="Initials">
                  {item.sender.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div
                  className="Title"
                  onClick={() => {
                    handleExpand(i);
                  }}
                >
                  <div className="Subject">{item.subject}</div>
                  <div className="SenderInformation">
                    <div className="Sender">{item.sender.name} </div>&nbsp;
                    <div className="EmailAddress">
                      &lt;{item.sender.emailaddress}&gt; &nbsp; | &nbsp;
                    </div>
                    <div className="Date"> {item.date}</div>
                  </div>
                </div>
              </div>
              <div
                className="Space"
                onClick={() => {
                  handleExpand(i);
                }}
              ></div>
              <div
                className="Item-Right"
                onClick={() => {
                  handleExpand(i);
                }}
              >
                <div className={expand === i ? "TagsList" : "TagsList.show"}>
                  {/* {expand === i ? } */}
                  <div className="Tags">{item.tags[0]}</div>
                  <div className="Tags-Bottom">
                    <div className="Tags">{item.tags[1]}</div>
                    <div className="Tags">{item.tags.length - 2}+</div>
                  </div>
                </div>
                <div className="Time">3 hrs.</div>
                <span className="Arrow">
                  {expand === i ? (
                    <AiOutlineDown size={10} />
                  ) : (
                    <AiOutlineRight size={10} />
                  )}
                </span>
              </div>
            </div>
            <div className={expand === i ? "Content.show" : "Content"}>
              <div className="EmailContent">
                <div className="MainContent">
                  <div className="SenderContent">{item.sender.name}</div>

                  <div className="DateContent">{item.date}</div>
                  <br></br>
                  <div className="ContentText">{item.content}</div>
                </div>
                <div className="ContentTagsList">
                  {item.tags.map((i) => (
                    <div className="ContentTag">{i}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
