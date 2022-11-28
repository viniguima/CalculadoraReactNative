import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';

export class InputNum extends Component {
  render() {
    return (
      <View style={styles.InputNum}>
        <TouchableOpacity onPress={() => { this.props.onClick() }}>
          <Text style={styles.textDisplay}>{this.props.displayKey}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export class OperatorKey extends Component {
  render() {
    return (
      <View style={styles.operationKey}>
        <TouchableOpacity onPress={() => { this.props.onClick() }}>
          <Text style={styles.textDisplay}>{this.props.displayKey}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


export default class App extends Component {
  constructor(props) {
    super();
    this.state = {
      display: "",
      number: "",
      operator: "",
      result: "",
      denominator: "",
      switchFractionSection: false
    }
  }

  clear() {
    this.setState((state, props) => ({ display: "" }));
    this.setState((state, props) => ({ result: "" }));
    this.setState((state,props) => ({ number: "" }));
    this.setState((state,props) => ({ denominator: "" }));
    this.setState((state,props) => ({ operator: "" }));
  }

  evalutate(x, y, operator) {
    if (operator === "+") {
      this.setState((state, props) => ({ result: parseFloat(x) + parseFloat(y) }))
      this.setState((state, props) => ({ switchFractionSection: false }))
    } else if (operator === "-") {
      this.setState((state, props) => ({ result: parseFloat(x) - parseFloat(y) }))
      this.setState((state, props) => ({ switchFractionSection: false }))
    } else if (operator === "x") {
      this.setState((state, props) => ({ result: parseFloat(x) * parseFloat(y) }))
      this.setState((state, props) => ({ switchFractionSection: false }))
    } else {
      this.setState((state, props) => ({ result: parseFloat(x) / parseFloat(y) }))
      this.setState((state, props) => ({ switchFractionSection: false }))
    }
    this.setState((prevState) => ({ denominator: "" }))
    this.setState((prevState) => ({ number: "" }))
  }

  addNum(x) {
    if (this.state.result) {
      this.clear();
    }
    this.setState((state, props) => ({ display: state.display + x }))
    if (this.state.switchFractionSection === true) {
      this.setState((state, props) => ({ denominator: state.denominator + x }))
    } else {
      this.setState((state, props) => ({ number: state.number + x }))
    }
  }

  operatorSymbol(x) {
    if (this.state.number === "" && this.state.switchFractionSection === false) {
      this.setState((state, props) => ({ number: this.state.display }))
    }

    this.setState((state, props) => ({ display: state.display + x }))
    this.setState((state, props) => ({ operator: x }))
    this.setState((state, props) => ({ switchFractionSection: true }))
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar style={{backgroundColor:"#fff"}}></StatusBar>
        <View >
          <Text style={styles.RA}>Nome: Vinicius Alexandre Franco {'\n'} RA: 2020202163 </Text>
        </View>
        <View style={styles.display}>
          <Text style={styles.displayText}>{this.state.display}</Text>
          <Text style={styles.displayText}>{this.state.result ? "=" : ""}</Text>
          <Text style={styles.result}>{this.state.result}</Text>
        </View>
        <View style={styles.inputCalculatorNumClear}>
          <InputNum displayKey="C" onClick={() => this.clear()} />
        </View>
        <View style={styles.inputCalculatorNum}>
          <OperatorKey displayKey="+" onClick={() => this.operatorSymbol("+")} />
          <OperatorKey displayKey="-" onClick={() => this.operatorSymbol("-")} />
          <OperatorKey displayKey="x" onClick={() => this.operatorSymbol("x")} />
          <OperatorKey displayKey="÷" onClick={() => this.operatorSymbol("/")} />
        </View>
        
        <View style={styles.inputCalculatorNum}>
          <InputNum displayKey="1" onClick={() => this.addNum("1")} />
          <InputNum displayKey="2" onClick={() => this.addNum("2")} />
          <InputNum displayKey="3" onClick={() => this.addNum("3")} />
        </View>
        <View style={styles.inputCalculatorNum}>
          <InputNum displayKey="4" onClick={() => this.addNum("4")} />
          <InputNum displayKey="5" onClick={() => this.addNum("5")} />
          <InputNum displayKey="6" onClick={() => this.addNum("6")} />
        </View>
        <View style={styles.inputCalculatorNum}>
          <InputNum displayKey="7" onClick={() => this.addNum("7")} />
          <InputNum displayKey="8" onClick={() => this.addNum("8")} />
          <InputNum displayKey="9" onClick={() => this.addNum("9")} />
        </View>
        <View style={styles.inputCalculatorNum}>
          <InputNum displayKey="." onClick={() => this.addNum(".")} />
          <InputNum displayKey="0" onClick={() => this.addNum("0")} />
          <InputNum displayKey="="
            onClick={
              () =>
                this.evalutate(
                  this.state.number,
                  this.state.denominator,
                  this.state.operator
                )
            } />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    alignItems: 'center',
    justifyContent: "space-around",
  },
  display: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#4F4F4F",
    color: "#fff",
    width: "100%",
    height: "20%",
  },

  displayText: {
    paddingTop: 10,
    color: "#fff",
    textAlign: "right",
    fontSize: 26,
    marginRight: 20,
  },
  result: {
    paddingTop: 10,
    color: "#fff",
    textAlign: "right",
    fontSize: 46,
    marginRight: 20,
  },
  RA: {
    marginTop:50,
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
  },

  inputCalculatorNum: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom:35
  },
  inputCalculatorNumClear: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    width: "150%",
  },

  textDisplay: {
    color: "#fff",
    textAlign: "center",
    padding: 8,
    fontSize: 40,
  },
  InputNum: {
    borderRadius: 18,
    backgroundColor: "#5e5e5e",
    flex: .3
  },

  operationKey: {
    borderRadius: 20,
    backgroundColor: "#FFA500",
    flex: .2
  },

});