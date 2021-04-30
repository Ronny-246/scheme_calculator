import "./styles.css";
import React from "react";
import { useState } from "react";

//product details data entry
const productDetails = {
  HDEx12: {
    name: "HD Ex - 12 inches",
    listprice: 1000,
    landingcost: 600,
    standard_discount: 24,
    cash_discount: 2
  },
  HDEx15: {
    name: "HD Ex - 15 inches",
    listprice: 1200,
    landingcost: 600,
    standard_discount: 24,
    cash_discount: 2
  },
  HDEx18: {
    name: "HD Ex - 18 inches",
    listprice: 1500,
    landingcost: 750,
    standard_discount: 24,
    cash_discount: 2
  },

  Air_circulators18: {
    name: "A/c - 18 inches",
    listprice: 2000,
    landingcost: 1000,
    standard_discount: 24,
    cash_discount: 2
  },
  Air_circulators24: {
    name: "A/c - 24 inches",
    listprice: 2400,
    landingcost: 1300,
    standard_discount: 24,
    cash_discount: 2
  },
  Air_circulators30: {
    name: "A/c - 30 inches",
    listprice: 2700,
    landingcost: 1700,
    standard_discount: 24,
    cash_discount: 2
  }
};

export default function App() {
  const [selectedProduct, setProduct] = useState("HDEx12");
  function choiceClick(product) {
    setProduct(product);
  }

  const [selectedType, setType] = useState("Price");
  function typeClick(system) {
    setType(system);
  }

  //function to choose what system of calucaltion
  const valueType = {
    Price: { type: "Price", sign: "Rs" },
    Discount: { type: "Discount", sign: "%" },
    Reduction_value: { type: "Reduction value", sign: "Rs" }
  };

  //taking user input
  var [userInput, setUserInput] = useState();

  function inputChangeHanlder(event) {
    console.log(event.target.value);
    setUserInput(event.target.value);
  }

  //function to perform calculations on each type system
  function calculation(selectedType, userInput) {
    if (selectedType === "Price") {
      this._price = userInput;
      this._discount =
        ((productDetails[selectedProduct].listprice - this._price) * 100) /
        productDetails[selectedProduct].listprice;
      this._stdDiscountedPrice =
        productDetails[selectedProduct].listprice *
        (1 -
          (productDetails[selectedProduct].standard_discount +
            productDetails[selectedProduct].cash_discount) /
            100);
      this._reductionValue = this._stdDiscountedPrice - this._price;
      this._gp = this._price - productDetails[selectedProduct].landingcost;
      this._standardgp =
        this._stdDiscountedPrice - productDetails[selectedProduct].landingcost;
      this._gpReduction = this._standardgp - this._gp;
      //array to return all the relevant data points
      return [
        "Price based system",
        this._price,
        this._discount,
        this._stdDiscountedPrice,
        this._reductionValue,
        this._gp,
        this._standardgp,
        this._gpReduction
      ];
    } else if (selectedType === "Discount") {
      this._discount = userInput;
      this._price =
        productDetails[selectedProduct].listprice * (1 - this._discount / 100);
      this._stdDiscountedPrice =
        productDetails[selectedProduct].listprice *
        (1 -
          (productDetails[selectedProduct].standard_discount +
            productDetails[selectedProduct].cash_discount) /
            100);
      this._reductionValue = this._stdDiscountedPrice - this._price;
      this._gp = this._price - productDetails[selectedProduct].landingcost;
      this._standardgp =
        this._stdDiscountedPrice - productDetails[selectedProduct].landingcost;
      this._gpReduction = this._standardgp - this._gp;
      //array to return all the relevant data points
      return [
        "Discount based system",
        this._price,
        this._discount,
        this._stdDiscountedPrice,
        this._reductionValue,
        this._gp,
        this._standardgp,
        this._gpReduction
      ];
    } else if (selectedType === "Reduction_value") {
      this._reductionValue = userInput;
      this._stdDiscountedPrice =
        productDetails[selectedProduct].listprice *
        (1 -
          (productDetails[selectedProduct].standard_discount +
            productDetails[selectedProduct].cash_discount) /
            100);
      this._price = this._stdDiscountedPrice - userInput;
      this._discount =
        ((productDetails[selectedProduct].listprice - this._price) * 100) /
        productDetails[selectedProduct].listprice;
      this._gp = this._price - productDetails[selectedProduct].landingcost;
      this._standardgp =
        this._stdDiscountedPrice - productDetails[selectedProduct].landingcost;
      this._gpReduction = this._standardgp - this._gp;
      //array to return all the relevant data points
      return [
        "Reduction value system",
        this._price,
        this._discount,
        this._stdDiscountedPrice,
        this._reductionValue,
        this._gp,
        this._standardgp,
        this._gpReduction
      ];
    }
  }

  return (
    <div className="App">
      <h1 className="primary">Scheme Calculator</h1>
      <hr />
      <h2>Choose the product</h2>
      <div>
        {Object.keys(productDetails).map((product) => (
          <button
            onClick={() => choiceClick(product)}
            className="buttonprimary"
          >
            {productDetails[product].name}
          </button>
        ))}

        <hr />
        <div className="productChoice">
          <h3>{productDetails[selectedProduct].name}</h3>
          <ul style={{ textAlign: "left" }}>
            <li>List Price = Rs {productDetails[selectedProduct].listprice}</li>
            <li>
              Std Discount = {productDetails[selectedProduct].standard_discount}{" "}
              %{" "}
            </li>
            <li>
              Cash Discount = {productDetails[selectedProduct].cash_discount} %{" "}
            </li>
          </ul>
        </div>

        <hr />
      </div>
      <h3> Choose type of calculation </h3>
      <div>
        {Object.keys(valueType).map((type) => (
          <button onClick={() => typeClick(type)} className="buttonprimary">
            <div> {valueType[type].type} </div>
          </button>
        ))}
      </div>

      <div>
        Enter {valueType[selectedType].type}{" "}
        <input className="inputfield" onChange={inputChangeHanlder} />{" "}
        {valueType[selectedType].sign}
      </div>
      <hr />

      <h3> ( {calculation(selectedType, userInput)[0]} ) </h3>

      <table className="table">
        <tr className="th">
          <th className="th"> Parameter </th>
          <th className="th"> Standard </th>
          <th className="th"> Current </th>
          <th className="th"> Difference </th>
        </tr>

        <tr className="th">
          <th className="th"> Price </th>
          <td className="th">Rs {calculation(selectedType, userInput)[3]} </td>
          <td className="th">Rs {calculation(selectedType, userInput)[1]} </td>
          <td className="th"> Rs {calculation(selectedType, userInput)[4]} </td>
        </tr>

        <tr className="th">
          <th className="th"> Discount </th>
          <td className="th">
            {" "}
            ({productDetails[selectedProduct].standard_discount} +{" "}
            {productDetails[selectedProduct].cash_discount})%{" "}
          </td>
          <td className="th"> {calculation(selectedType, userInput)[2]} %</td>
          <td className="th">
            {" "}
            {calculation(selectedType, userInput)[2] -
              (productDetails[selectedProduct].standard_discount +
                productDetails[selectedProduct].cash_discount)}
            %
          </td>
        </tr>

        <tr className="th">
          <th className="th"> GP </th>
          <td className="th"> Rs {calculation(selectedType, userInput)[6]} </td>
          <td className="th"> Rs {calculation(selectedType, userInput)[5]} </td>
          <td className="th"> Rs {calculation(selectedType, userInput)[7]} </td>
        </tr>
      </table>
    </div>
  );
}
