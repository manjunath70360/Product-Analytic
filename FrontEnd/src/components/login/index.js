import {Component} from 'react'
import Cookies from 'js-cookie'
//import {Redirect} from 'react-router-dom'

import TabRender from "../tab/index"
import './index.css'

const tabList = [{tabName:"SIGNIN", tabId:'login'}, {tabName:"SIGNUP", tabId:"create-account"}]

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    address: "",
    phoneNo:"",
    showSubmitError: false,
    errorMsg:'',
    activeTab:tabList[0].tabId
  }

  // componentDidMount(){

  //   this.getdata()

  // }

  
  // getdata = async()=>{
  //   const res = await fetch("https://product-analytic.onrender.com/todos")
  //   const data = await res.json()
  //   console.log(data)
  //   }

  onChangeUsername = event => {

      this.setState({username: event.target.value})
    
  }

  onChangePassword = event => {

      this.setState({password: event.target.value})
    
  }

  onChangeAddress = event => {

    this.setState({address: event.target.value})
  
}

onChangePhoneNo = event => {

  this.setState({phoneNo: event.target.value})

}

  LoginSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('home')
  }

  // onSubmitFailure = errorMsg => {
  //   this.setState({showSubmitError: true, errorMsg})
  // }


onChangeTab = (id) =>{
  
  this.setState({activeTab:id, showSubmitError:false, errorMsg:""})
}

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
   
    const url = 'https://product-analytic.onrender.com/login'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    this.setState({username: '', password:''})
 if(data.statusCode===400){
  this.setState({showSubmitError: true, errorMsg:data.text})
 }
 else{
  this.setState({showSubmitError: true, errorMsg:data.text}, this.LoginSuccess(data.jwtToken))

 }

  }

  createUserAccount = async () => {
    
    const {username, password, phoneNo, address} = this.state
    if (username==="" || password==="" || phoneNo==="" || address===""){
      alert("Enter All The Required Fields")
    }else{
      const userDetails = {username, password, phoneNo, address}
      const url = 'https://product-analytic.onrender.com/newuser'
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      }
   
      const response = await fetch(url, options)
      const data = await response.json()
     
      this.setState({username: '', password:'', phoneNo:'', address:''})
  
      if(data.statusCode===400){
        this.setState({showSubmitError: true, errorMsg:data.text})
       }
       else if(data.status){
        this.setState({activeTab:tabList[0].tabId, showSubmitError:false, errorMsg:""})
        console.log(data)
       }
    }
    

   
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
          required
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
          required
        />
      </>
    )
  }

  renderAddressField = () => {
    const {address} = this.state

    return (
      <>
        <label className="input-label" htmlFor="address">
          ADDRESS
        </label>
        <input
          type="text"
          id="address"
          className="username-input-field"
          value={address}
          onChange={this.onChangeAddress}
          placeholder="Address"
          required
        />
      </>
    )
  }

  renderPhoneNO = () => {
    const {phoneNo} = this.state

    return (
      <>
        <label className="input-label" htmlFor="phone">
          PHONE NUMBER
        </label>
        <input
          type="text"
          id="phone"
          className="username-input-field"
          value={phoneNo}
          onChange={this.onChangePhoneNo}
          placeholder="Phone"
          required
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg, activeTab} = this.state
    // const jwtToken = Cookies.get('jwt_token')

    // if (jwtToken !== undefined) {
    //   return <Redirect to="/" />
    // }

const activeLogin = activeTab === "login" ? true : false

    return (
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-img"
          alt="website logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-img"
          alt="website login"
        />

       

        

        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-img"
            alt="website logo"
          />
          
          <ul className='tab-list'>
        {tabList.map(eachTab =>(
          <TabRender details={eachTab} isActive={activeTab} key={eachTab.tabId} onChangeTab={this.onChangeTab}/>
        ))}
        </ul>

{activeLogin ? (<> <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div></>):
         ( <><div className="input-container">{this.renderUsernameField()}</div>
         <div className="input-container">{this.renderPhoneNO()}</div>
         <div className="input-container">{this.renderAddressField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div></>)}

          {activeLogin ?  <button type="submit" className="login-button">
            Login
          </button> : <button type="button" onClick={this.createUserAccount} className="login-button">
            Create Account
          </button>}
          
         
          
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
