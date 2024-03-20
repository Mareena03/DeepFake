export default function loginForm()
{
    return (
        <div id="myModal" className="modal" style={{display: 'none', position: 'fixed', zIndex: 1, left: 0, top: 0, width: '100%', height: '100%', overflow: 'auto', backgroundColor: 'rgba(0,0,0,0.4)'}}>
          <div className="modal-content" style={{backgroundColor: '#fefefe', margin: '15% auto', padding: 20, border: '1px solid #888', width: '80%'}}>
            <span className="close" style={{color: '#aaaaaa', float: 'right', fontSize: 28, fontWeight: 'bold'}}>&times;</span>
            <h2 style={{marginTop: 0}}>Login</h2>
            <form>
              <label htmlFor="username">Username:</label><br/>
              <input type="text" id="username" name="username" style={{width: '100%', padding: 10, margin: '5px 0 10px 0', border: '1px solid #ccc', borderRadius: 4, boxSizing: 'border-box'}}/><br/>
              <label htmlFor="password">Password:</label><br/>
              <input type="password" id="password" name="password" style={{width: '100%', padding: 10, margin: '5px 0 10px 0', border: '1px solid #ccc', borderRadius: 4, boxSizing: 'border-box'}}/><br/><br/>
              <button type="button" id="loginSubmit" style={{backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer', borderRadius: 4}}>Submit</button>
            </form>
          </div>
        </div>
      );
}