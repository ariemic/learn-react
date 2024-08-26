import { useState } from "react";

export default function App() {
  const [bill, setBill] = useState(0);
  const [tips, setTips] = useState([0, 0]);
  // const [selectedVal, setSelectedVal] = useState(0);

  console.log(tips);
  return (
    <div>
      <Bill setBill={setBill} bill={bill}></Bill>
      <Service setTips={setTips} tips={tips} idx={0}>
        you
      </Service>
      <Service setTips={setTips} tips={tips} idx={1}>
        your friend
      </Service>
      <Output bill={bill} tips={tips}></Output>
      <Reset setBill={setBill} setTips={setTips} />
    </div>
  );
}

function Bill({ setBill, bill }) {
  return (
    <div className="box">
      <p>How much was the bill?</p>
      <input
        type="number"
        onChange={(e) => setBill(Number(e.target.value))}
        value={bill || ""}
        min="0"
      />
    </div>
  );
}

function Service({ children, setTips, tips, idx }) {
  function handleSelectChange(e) {
    const newTips = [...tips];
    newTips[idx] = Number(e.target.value);
    setTips(newTips);
  }
  return (
    <div className="box">
      <p>How did {children} like the service?</p>
      <select
        onChange={(e) => handleSelectChange(e)}
        {...(tips.every((tip) => tip === 0) ? { value: "0" } : {})}
      >
        <option value="0">Dissatified (0%)</option>
        <option value="5">It was okay(5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function Output({ bill, tips }) {
  if (!bill) return;

  const procentage = tips.reduce((acc, curVal) => acc + curVal) / tips.length;
  const avgTip = Math.round(bill * (procentage / 100));
  console.log(avgTip);

  return (
    <h2>
      You pay ${avgTip + bill} (${bill}+${avgTip} tip)
    </h2>
  );
}

function Reset({ setBill, setTips }) {
  function handleReset() {
    setBill(0);
    setTips([0, 0]);
  }
  return <button onClick={handleReset}>Reset</button>;
}
