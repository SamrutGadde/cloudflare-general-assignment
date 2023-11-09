import logo from './CF_logomark.svg';
import wavesTop from './waves-top.svg';
import wavesBottom from './waves-bottom.svg';
import './App.css';

function App() {
  return (
    <div className="App" style={{position:'absolute', display:"flex", justifyContent:"center", alignItems:"center", width:'100%', height:'100%'}}>
      <img src={wavesTop} alt='waves' style={{position:'absolute', top:0, left:0, width:'100%', height:'100%', objectFit:'cover'}} />
      <div style={{padding: "1rem", background: "linear-gradient(to right, #f4801f, #f9ab41)", borderRadius: 20, zIndex: 10}}>
        <div style={{display:'flex', flexDirection:"column", justifyContent:"center", alignItems:"center", background: "white", padding:"2rem", borderRadius: 20}}>
          <img src={logo} alt='cloudflare logo' width={100} />
          <h1>My Cloudflare General Assignment!</h1>
          <h2>by: <span style={{color:"#f4801f"}}>Samrut Gadde</span></h2>
          <h2>Click the button below to view the org chart!</h2>
          <a href="/orgchart" style={{textDecoration:"none", color:"white", backgroundColor:"#f4801f", padding:10, borderRadius:5}}>View Org Chart</a>
        </div>
      </div>
      <img src={wavesBottom} alt='waves' style={{position:'absolute', bottom:0, left:0, width:'100%', height:'100%', objectFit:'cover'}} />
    </div>
  );
}

export default App;

