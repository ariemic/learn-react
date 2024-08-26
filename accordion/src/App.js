import { useState } from "react";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  return (
    <div>
      <Accordion data={faqs} />
    </div>
  );
}

function Accordion({ data }) {
  const [currOpen, setCurrOpen] = useState(null);
  return (
    <div className="accordion">
      {data.map((item, idx) => (
        <Item
          num={idx + 1}
          title={item.title}
          currOpen={currOpen}
          onOpen={setCurrOpen}
          key={item.title}
        >
          {item.text}
        </Item>
      ))}

      <Item
        num={22}
        title="Test 1"
        currOpen={currOpen}
        onOpen={setCurrOpen}
        key="Test 1"
      >
        <p>Allow React developers to: </p>
        <ul>
          <li>Break up UI into components</li>
          <li>Make components reusuable</li>
          <li>Lorem ipsum dolor sit amet.</li>
        </ul>
      </Item>
    </div>
  );
}

function Item({ num, title, currOpen, onOpen, children }) {
  const isOpen = num === currOpen;

  function handleToggle() {
    onOpen(isOpen ? null : num);
  }

  return (
    <div className={`item ${isOpen ? "open" : ""}`} onClick={handleToggle}>
      <p className="number">{num < 9 ? `0${num}` : num}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  );
}
