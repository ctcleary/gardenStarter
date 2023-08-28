import React, {useState} from 'react';

import produceItemsJSON from './config/produceItems.js';

export default function App() {
  const config = produceItemsJSON;
  const [selectedItem, setSelectedItem] = useState("");
  const [produceInfo, setProduceInfo] = useState("");

  function handleClick(choice) {
    setSelectedItem(choice.name);
    setProduceInfo(choice.desc);
  }

  function handleCloseInfo() {
    setSelectedItem("");
    setProduceInfo("");
  }

  // function addProduce(newItem) {
  //   const newProduce = produce.slice();
  //   if (produce.indexOf(newItem) !== -1) {
  //     return;
  //   }
  //   newProduce.push(newItem);
  //   setProduce(newProduce);
  // }

  const produceListItems = [];
  for (const key in config) {
    produceListItems.push(
        <ProduceChoice 
          item={ config[key] }
          onProduceItemClick={() => handleClick(config[key])}
          isActive={ selectedItem === config[key].name }
        />
    );
  }

  return (
    <div>
      <div className="appContainer">
        <div className="appTitle">
          <div className="appLogoContainer">
            <img className="appLogo" src={ GetImageFolder() + "GardenStarterIcon.png" } alt="Garden Starter Logo"/>
          </div>
          <h1 className="appHeadline">Welcome to GardenStarter!</h1>
        </div>
        <div className="appContent">
          <p className="question"> What would you like to learn more about? </p>
          <div className="produceList">
            {produceListItems}
          </div>
          <ProduceInfo item={ config[selectedItem] } onCloseInfo={ handleCloseInfo } />
        </div>
      </div>
    </div>
  );
}

function GetImageFolder() { 
  return (window.location.href.indexOf("localhost") == -1) ? "/websamples/gardenstarter/img/" : "../img/";
}

function ProduceChoice({ item, onProduceItemClick, isActive }) {
  const className = "produceItem " + (isActive ? "active" : "");
  const listKey = "produceItem"+item.name;
  return (
    <button key={listKey} className={className} onClick={isActive ? null : () => onProduceItemClick()} disabled={ isActive }>
      <ProduceImage currentItem={ item } />
      <span className="choiceTitle">{ item.name }</span>
    </button>
  );
}

function ProduceImage({ currentItem }) {
  const imgFolder = GetImageFolder();
  if (!currentItem.img) {
    return (
      <img className="produceImage" src={ imgFolder + "GardenStarterQuestionMark.png" } alt={ currentItem.name } />
    );
  }

  return (
    <img className="produceImg" src={ imgFolder + currentItem.img } alt={ currentItem.name } />
  )
}


function ProduceInfo({ item, onCloseInfo }) {
  if(!item) {
   return; // In case there is no current selected item.
  }

  const itemName = (item.name) ? item.name : "No name found.";
  const itemDesc = (item.desc) ? item.desc : "No description found.";

  return (
   <div className="produceInfo">
     <div className="infoHeadline">
       <button className="closeInfoButton" onClick={() => onCloseInfo()}>
         <span className="xSpan">+</span>
       </button>
       <ProduceImage currentItem={ item } /> 
       <h2 className="produceInfoHeadline">
         { itemName }
       </h2>
     </div>
     <div className="produceInfoContent">
       { itemDesc }
       {/*<ProduceInfoDisplay item={ item } />*/}
     </div>
   </div>
  );
}

/* --- Incomplete feature. 
       Show "Produce Info" table.

function ProduceInfoDisplay({ item }) {
  const itemKeys = Object.keys(item);
  console.log('item', item);
  const cleanedItem = {};
  const filteredKeys = itemKeys.filter((key) => {
    // console.log("key ::", key);
    if (key === "name" || key === "img") {
      return false;
    }
    return true;
  });
  // console.log("filteredKeys ::", filteredKeys);

  return (<div/>);
}
---- */