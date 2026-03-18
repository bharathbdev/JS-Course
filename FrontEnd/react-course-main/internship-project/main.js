const { useState, useEffect } = React;

// --- Modern Navbar ---
function Navbar({ page, setPage }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-fixed-top shadow-sm" style={{background: 'linear-gradient(90deg,#23272f,#0ea5e9)', color:'#fff', position:'fixed', top:0, width:'100%', zIndex:1000}}>
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand fw-bold fs-3" href="#" style={{color:'#fff'}}>
            <i className="bi bi-building"></i> Smart Rent Management
          </a>
        </div>
        <ul className="nav navbar-nav ms-auto mb-2 mb-lg-0">
          <li className={page==='home' ? 'active nav-item' : 'nav-item'}><a className="nav-link" href="#" onClick={() => setPage('home')}>Dashboard</a></li>
          <li className={page==='about' ? 'active nav-item' : 'nav-item'}><a className="nav-link" href="#" onClick={() => setPage('about')}>About Us</a></li>
          <li className={page==='features' ? 'active nav-item' : 'nav-item'}><a className="nav-link" href="#" onClick={() => setPage('features')}>Features</a></li>
          <li className={page==='contact' ? 'active nav-item' : 'nav-item'}><a className="nav-link" href="#" onClick={() => setPage('contact')}>Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}

// --- Hero Section with Responsive Carousel ---
function HeroSection() {
  return (
    <section className="hero-section text-center animate__animated animate__fadeInDown" style={{padding:'0',marginBottom:'0'}}>
      <div className="container-fluid p-0">
        <div id="heroCarousel" className="carousel slide mb-0" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" className="d-block w-100 img-fluid rounded-4 border border-3 border-primary shadow-lg" alt="Building" style={{maxHeight:'420px',objectFit:'cover'}} />
            </div>
            <div className="carousel-item">
              <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80" className="d-block w-100 img-fluid rounded-4 border border-3 border-info shadow-lg" alt="Apartment" style={{maxHeight:'420px',objectFit:'cover'}} />
            </div>
            <div className="carousel-item">
              <img src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80" className="d-block w-100 img-fluid rounded-4 border border-3 border-success shadow-lg" alt="Rent" style={{maxHeight:'420px',objectFit:'cover'}} />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className="py-5">
          <h1 className="display-4 fw-bold mb-3 text-primary">Smart Rent Management</h1>
          <p className="lead mb-4 text-dark">Efficiently manage tenants, track rent, and automate reminders.<br/>Modern, simple, and powerful.</p>
        </div>
      </div>
    </section>
  );
}

// --- Simulated JSON Data (localStorage) ---
const DEFAULT_DATA = {
  owners: [
    { ownerId: 'o1', name: 'Owner One', email: 'owner@demo.com', password: 'owner123', buildingName: 'Sunrise Apartments' }
  ],
  tenants: [
    { tenantId: 't1', ownerId: 'o1', name: 'John Doe', email: 'john@demo.com', phone: '1234567890', roomNo: '101', rentAmount: 12000, advancePaid: 5000, paymentMode: 'UPI', status: 'Paid', lastPaidDate: '2026-03-01' },
    { tenantId: 't2', ownerId: 'o1', name: 'Jane Smith', email: 'jane@demo.com', phone: '9876543210', roomNo: '102', rentAmount: 13000, advancePaid: 6000, paymentMode: 'Cash', status: 'Pending', lastPaidDate: '2026-02-01' }
  ],
  payments: [
    { paymentId: 'p1', tenantId: 't1', month: '2026-03', amount: 12000, paymentDate: '2026-03-01' }
  ]
};

function loadData() {
  const data = localStorage.getItem('rentData');
  return data ? JSON.parse(data) : DEFAULT_DATA;
}
function saveData(data) {
  localStorage.setItem('rentData', JSON.stringify(data));
}

// --- Owner Dashboard with Login & Registration ---
function OwnerDashboard() {
  const [data, setData] = useState(loadData());
  const [loggedIn, setLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  // Registration fields
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regBuilding, setRegBuilding] = useState('');
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');

  useEffect(() => {
    saveData(data);
  }, [data]);

  function handleLogin(e) {
    e.preventDefault();
    const owner = data.owners.find(o => o.email === email && o.password === password);
    if (owner) {
      setLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials');
    }
  }

  function handleRegister(e) {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword || !regBuilding) {
      setRegError('All fields required');
      setRegSuccess('');
      return;
    }
    if (data.owners.some(o => o.email === regEmail)) {
      setRegError('Email already registered');
      setRegSuccess('');
      return;
    }
    const newOwner = {
      ownerId: 'o' + Date.now(),
      name: regName,
      email: regEmail,
      password: regPassword,
      buildingName: regBuilding
    };
    const newData = { ...data, owners: [...data.owners, newOwner] };
    setData(newData);
    setRegSuccess('Registration successful! You can now login.');
    setRegError('');
    setRegName(''); setRegEmail(''); setRegPassword(''); setRegBuilding('');
  }

  if (!loggedIn) {
    return (
      <div className="glass my-4 animate__animated animate__fadeInUp" style={{maxWidth: 400, margin: '0 auto'}}>
        <h2 className="mb-3 text-center"><i className="bi bi-person-badge"></i> Owner {showRegister ? 'Register' : 'Login'}</h2>
        <div className="d-flex justify-content-center mb-2">
          <button className={`btn btn-link ${!showRegister ? 'fw-bold' : ''}`} onClick={() => setShowRegister(false)}>Login</button>
          <span className="mx-2">|</span>
          <button className={`btn btn-link ${showRegister ? 'fw-bold' : ''}`} onClick={() => setShowRegister(true)}>Register</button>
        </div>
        {!showRegister ? (
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            {loginError && <div className="alert alert-danger py-1">{loginError}</div>}
            <button className="btn btn-primary w-100" type="submit">Login</button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" value={regName} onChange={e => setRegName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={regEmail} onChange={e => setRegEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={regPassword} onChange={e => setRegPassword(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Building Name</label>
              <input type="text" className="form-control" value={regBuilding} onChange={e => setRegBuilding(e.target.value)} required />
            </div>
            {regError && <div className="alert alert-danger py-1">{regError}</div>}
            {regSuccess && <div className="alert alert-success py-1">{regSuccess}</div>}
            <button className="btn btn-success w-100" type="submit">Register</button>
          </form>
        )}
      </div>
    );
  }

  // Owner dashboard content
  const owner = data.owners.find(o => o.email === email && o.password === password) || data.owners[data.owners.length-1];
  const tenants = data.tenants.filter(t => t.ownerId === owner.ownerId);
  const totalRent = tenants.reduce((sum, t) => sum + t.rentAmount, 0);
  const pendingTenants = tenants.filter(t => t.status !== 'Paid');

  return (
    <div className="glass my-4 animate__animated animate__fadeInUp">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0"><i className="bi bi-person-badge"></i> Owner Dashboard</h2>
        <span className="badge bg-secondary">{owner.buildingName}</span>
      </div>
      <div className="row mb-4">
        <div className="col-md-4 mb-2">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Total Tenants</h5>
              <span className="display-6 fw-bold text-primary">{tenants.length}</span>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-2">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Total Rent (₹)</h5>
              <span className="display-6 fw-bold text-success">{totalRent}</span>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-2">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Pending Rents</h5>
              <span className="display-6 fw-bold text-danger">{pendingTenants.length}</span>
            </div>
          </div>
        </div>
      </div>
      <h4 className="mt-4 mb-2">Tenant List</h4>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Room</th>
              <th>Rent</th>
              <th>Status</th>
              <th>Last Paid</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map(t => (
              <tr key={t.tenantId} className={t.status !== 'Paid' ? 'table-warning' : ''}>
                <td>{t.name}</td>
                <td>{t.roomNo}</td>
                <td>₹{t.rentAmount}</td>
                <td>{t.status === 'Paid' ? <span className="badge bg-success">Paid</span> : <span className="badge bg-danger">Pending</span>}</td>
                <td>{t.lastPaidDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- Tenant Dashboard with Login & Registration ---
function TenantDashboard() {
  const [data, setData] = useState(loadData());
  const [loggedIn, setLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [tenant, setTenant] = useState(null);
  // Registration fields
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regRoom, setRegRoom] = useState('');
  const [regRent, setRegRent] = useState('');
  const [regAdvance, setRegAdvance] = useState('');
  const [regPaymentMode, setRegPaymentMode] = useState('UPI');
  const [regOwnerEmail, setRegOwnerEmail] = useState('');
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');

  useEffect(() => {
    saveData(data);
  }, [data]);

  function handleLogin(e) {
    e.preventDefault();
    const t = data.tenants.find(t => t.email === email && t.phone === password);
    if (t) {
      setTenant(t);
      setLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials');
    }
  }

  function handleRegister(e) {
    e.preventDefault();
    if (!regName || !regEmail || !regPhone || !regRoom || !regRent || !regAdvance || !regOwnerEmail) {
      setRegError('All fields required');
      setRegSuccess('');
      return;
    }
    if (data.tenants.some(t => t.email === regEmail)) {
      setRegError('Email already registered');
      setRegSuccess('');
      return;
    }
    const owner = data.owners.find(o => o.email === regOwnerEmail);
    if (!owner) {
      setRegError('Owner email not found');
      setRegSuccess('');
      return;
    }
    const newTenant = {
      tenantId: 't' + Date.now(),
      ownerId: owner.ownerId,
      name: regName,
      email: regEmail,
      phone: regPhone,
      roomNo: regRoom,
      rentAmount: parseInt(regRent),
      advancePaid: parseInt(regAdvance),
      paymentMode: regPaymentMode,
      status: 'Pending',
      lastPaidDate: ''
    };
    const newData = { ...data, tenants: [...data.tenants, newTenant] };
    setData(newData);
    setRegSuccess('Registration successful! You can now login.');
    setRegError('');
    setRegName(''); setRegEmail(''); setRegPhone(''); setRegRoom(''); setRegRent(''); setRegAdvance(''); setRegOwnerEmail('');
  }

  if (!loggedIn) {
    return (
      <div className="glass my-4 animate__animated animate__fadeInUp" style={{maxWidth: 400, margin: '0 auto'}}>
        <h2 className="mb-3 text-center"><i className="bi bi-people"></i> Tenant {showRegister ? 'Register' : 'Login'}</h2>
        <div className="d-flex justify-content-center mb-2">
          <button className={`btn btn-link ${!showRegister ? 'fw-bold' : ''}`} onClick={() => setShowRegister(false)}>Login</button>
          <span className="mx-2">|</span>
          <button className={`btn btn-link ${showRegister ? 'fw-bold' : ''}`} onClick={() => setShowRegister(true)}>Register</button>
        </div>
        {!showRegister ? (
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone (as password)</label>
              <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            {loginError && <div className="alert alert-danger py-1">{loginError}</div>}
            <button className="btn btn-primary w-100" type="submit">Login</button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" value={regName} onChange={e => setRegName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={regEmail} onChange={e => setRegEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone (as password)</label>
              <input type="text" className="form-control" value={regPhone} onChange={e => setRegPhone(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Room No</label>
              <input type="text" className="form-control" value={regRoom} onChange={e => setRegRoom(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Rent Amount</label>
              <input type="number" className="form-control" value={regRent} onChange={e => setRegRent(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Advance Paid</label>
              <input type="number" className="form-control" value={regAdvance} onChange={e => setRegAdvance(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Payment Mode</label>
              <select className="form-select" value={regPaymentMode} onChange={e => setRegPaymentMode(e.target.value)}>
                <option value="UPI">UPI</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Owner Email</label>
              <input type="email" className="form-control" value={regOwnerEmail} onChange={e => setRegOwnerEmail(e.target.value)} required />
              <div className="form-text">Ask your owner for their registered email.</div>
            </div>
            {regError && <div className="alert alert-danger py-1">{regError}</div>}
            {regSuccess && <div className="alert alert-success py-1">{regSuccess}</div>}
            <button className="btn btn-success w-100" type="submit">Register</button>
          </form>
        )}
      </div>
    );
  }

  // Tenant dashboard content
  const payments = data.payments.filter(p => p.tenantId === tenant.tenantId);
  return (
    <div className="glass my-4 animate__animated animate__fadeInUp">
      <h2 className="mb-3"><i className="bi bi-people"></i> Tenant Dashboard</h2>
      <div className="mb-3">
        <strong>Name:</strong> {tenant.name}<br/>
        <strong>Email:</strong> {tenant.email}<br/>
        <strong>Phone:</strong> {tenant.phone}<br/>
        <strong>Room No:</strong> {tenant.roomNo}<br/>
        <strong>Rent Amount:</strong> ₹{tenant.rentAmount}<br/>
        <strong>Status:</strong> {tenant.status === 'Paid' ? <span className="badge bg-success">Paid</span> : <span className="badge bg-danger">Pending</span>}<br/>
        <strong>Last Paid Date:</strong> {tenant.lastPaidDate}
      </div>
      <h5>Payment History</h5>
      <ul className="list-group">
        {payments.length === 0 && <li className="list-group-item">No payments yet.</li>}
        {payments.map(p => (
          <li className="list-group-item" key={p.paymentId}>
            <span className="me-2"><i className="bi bi-currency-rupee"></i>{p.amount}</span>
            <span className="me-2">{p.month}</span>
            <span className="text-muted">{p.paymentDate}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- Single Registration/Login Page ---
function RegistrationLogin({ onOwnerLogin }) {
  const [data, setData] = useState(loadData());
  const [isOwnerReg, setIsOwnerReg] = useState(true);
  // Owner registration
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerPassword, setOwnerPassword] = useState('');
  const [ownerError, setOwnerError] = useState('');
  const [ownerSuccess, setOwnerSuccess] = useState('');
  // Owner login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => { saveData(data); }, [data]);

  function handleOwnerRegister(e) {
    e.preventDefault();
    if (!ownerName || !ownerEmail || !ownerPassword) {
      setOwnerError('All fields required');
      setOwnerSuccess('');
      return;
    }
    if (data.owners.some(o => o.email === ownerEmail)) {
      setOwnerError('Email already registered');
      setOwnerSuccess('');
      return;
    }
    const newOwner = {
      ownerId: 'o' + Date.now(),
      name: ownerName,
      email: ownerEmail,
      password: ownerPassword,
      buildingName: 'Building'
    };
    setData({ ...data, owners: [...data.owners, newOwner] });
    setOwnerSuccess('Registration successful! You can now login.');
    setOwnerError('');
    setOwnerName(''); setOwnerEmail(''); setOwnerPassword('');
  }

  function handleOwnerLogin(e) {
    e.preventDefault();
    const owner = data.owners.find(o => o.email === loginEmail && o.password === loginPassword);
    if (owner) {
      setLoginError('');
      onOwnerLogin(owner, data);
    } else {
      setLoginError('Invalid credentials');
    }
  }

  return (
    <div className="glass my-4 animate__animated animate__fadeInUp" style={{maxWidth: 420, margin: '0 auto'}}>
      <h2 className="mb-3 text-center"><i className="bi bi-person-badge"></i> {isOwnerReg ? 'Owner Registration' : 'Owner Login'}</h2>
      <div className="d-flex justify-content-center mb-2">
        <button className={`btn btn-link ${isOwnerReg ? 'fw-bold' : ''}`} onClick={() => setIsOwnerReg(true)}>Register</button>
        <span className="mx-2">|</span>
        <button className={`btn btn-link ${!isOwnerReg ? 'fw-bold' : ''}`} onClick={() => setIsOwnerReg(false)}>Login</button>
      </div>
      {isOwnerReg ? (
        <form onSubmit={handleOwnerRegister}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" value={ownerName} onChange={e => setOwnerName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={ownerEmail} onChange={e => setOwnerEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={ownerPassword} onChange={e => setOwnerPassword(e.target.value)} required />
          </div>
          {ownerError && <div className="alert alert-danger py-1">{ownerError}</div>}
          {ownerSuccess && <div className="alert alert-success py-1">{ownerSuccess}</div>}
          <button className="btn btn-success w-100" type="submit">Register</button>
        </form>
      ) : (
        <form onSubmit={handleOwnerLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required />
          </div>
          {loginError && <div className="alert alert-danger py-1">{loginError}</div>}
          <button className="btn btn-primary w-100" type="submit">Login</button>
        </form>
      )}
    </div>
  );
}

// --- Owner Dashboard: Add Tenants, View/Update Tenant Details, Approve, View History ---
function OwnerDashboardV2({ owner, data, setData, onLogout }) {
  const [showAddTenant, setShowAddTenant] = useState(false);
  const [tenantName, setTenantName] = useState('');
  const [tenantEmail, setTenantEmail] = useState('');
  const [tenantRent, setTenantRent] = useState('');
  const [tenantAdvance, setTenantAdvance] = useState('');
  const [tenantRoom, setTenantRoom] = useState('');
  const [tenantPhone, setTenantPhone] = useState('');
  const [tenantError, setTenantError] = useState('');
  const [tenantSuccess, setTenantSuccess] = useState('');
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [editTenant, setEditTenant] = useState(null);

  // Add tenant (owner only adds basic info, not approved yet, tenant must register)
  function handleAddTenant(e) {
    e.preventDefault();
    if (!tenantName || !tenantEmail || !tenantRent || !tenantAdvance || !tenantRoom || !tenantPhone) {
      setTenantError('All fields required');
      setTenantSuccess('');
      return;
    }
    if (data.tenants.some(t => t.email === tenantEmail)) {
      setTenantError('Email already exists');
      setTenantSuccess('');
      return;
    }
    const newTenant = {
      tenantId: 't' + Date.now(),
      ownerId: owner.ownerId,
      name: tenantName,
      email: tenantEmail,
      phone: tenantPhone,
      roomNo: tenantRoom,
      rentAmount: parseInt(tenantRent),
      advancePaid: parseInt(tenantAdvance),
      paymentMode: 'UPI',
      status: 'Pending Registration',
      lastPaidDate: '',
      approved: false,
      vacated: false,
      registered: false
    };
    setData({ ...data, tenants: [...data.tenants, newTenant] });
    setTenantSuccess('Tenant added. Ask tenant to register.');
    setTenantError('');
    setTenantName(''); setTenantEmail(''); setTenantRent(''); setTenantAdvance(''); setTenantRoom(''); setTenantPhone('');
    setShowAddTenant(false);
  }

  // Approve pending tenants (who have registered)
  function handleApproveTenant(tenantId) {
    const newTenants = data.tenants.map(t => t.tenantId === tenantId ? { ...t, approved: true, status: 'Approved' } : t);
    setData({ ...data, tenants: newTenants });
  }

  // Vacate tenant
  function handleVacateTenant(tenantId) {
    const newTenants = data.tenants.map(t => t.tenantId === tenantId ? { ...t, vacated: true, status: 'Vacated' } : t);
    setData({ ...data, tenants: newTenants });
  }

  // Mark tenant as registered (when tenant completes registration)
  function markTenantRegistered(email, phone) {
    const newTenants = data.tenants.map(t => t.email === email && t.phone === phone ? { ...t, registered: true, status: 'Awaiting Approval' } : t);
    setData({ ...data, tenants: newTenants });
  }

  // Select tenant for viewing/updating
  function handleSelectTenant(tenant) {
    setSelectedTenant(tenant);
    setEditTenant({ ...tenant });
  }

  // Update tenant details
  function handleUpdateTenant(e) {
    e.preventDefault();
    const newTenants = data.tenants.map(t => t.tenantId === editTenant.tenantId ? { ...editTenant } : t);
    setData({ ...data, tenants: newTenants });
    setSelectedTenant(null);
    setEditTenant(null);
  }

  const tenants = data.tenants.filter(t => t.ownerId === owner.ownerId);
  const pendingTenants = tenants.filter(t => t.registered && !t.approved && !t.vacated);
  const awaitingRegistration = tenants.filter(t => !t.registered && !t.vacated);
  const approvedTenants = tenants.filter(t => t.approved && !t.vacated);
  const vacatedTenants = tenants.filter(t => t.vacated);

  return (
    <div className="glass my-4 animate__animated animate__fadeInUp">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0"><i className="bi bi-person-badge"></i> Owner Dashboard</h2>
        <span className="badge bg-secondary">{owner.buildingName}</span>
        <button className="btn btn-outline-danger btn-sm" onClick={onLogout}>Logout</button>
      </div>
      <div className="row mb-4 g-3">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Total Tenants</h5>
              <span className="display-6 fw-bold text-primary">{tenants.length}</span>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Approved Tenants</h5>
              <span className="display-6 fw-bold text-success">{approvedTenants.length}</span>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Vacated Tenants</h5>
              <span className="display-6 fw-bold text-danger">{vacatedTenants.length}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Tenants</h4>
        <button className="btn btn-primary btn-sm" onClick={() => setShowAddTenant(true)}><i className="bi bi-person-plus"></i> Add Tenant</button>
      </div>
      {/* Add Tenant Modal */}
      {showAddTenant && (
        <div className="modal d-block" tabIndex="-1" style={{background: 'rgba(0,0,0,0.3)'}}>
          <div className="modal-dialog">
            <div className="modal-content glass animate__animated animate__fadeInUp">
              <div className="modal-header">
                <h5 className="modal-title"><i className="bi bi-person-plus"></i> Add New Tenant</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddTenant(false)}></button>
              </div>
              <form onSubmit={handleAddTenant} className="p-3">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" value={tenantName} onChange={e => setTenantName(e.target.value)} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={tenantEmail} onChange={e => setTenantEmail(e.target.value)} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control" value={tenantPhone} onChange={e => setTenantPhone(e.target.value)} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Room No</label>
                    <input type="text" className="form-control" value={tenantRoom} onChange={e => setTenantRoom(e.target.value)} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Rent</label>
                    <input type="number" className="form-control" value={tenantRent} onChange={e => setTenantRent(e.target.value)} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Advance</label>
                    <input type="number" className="form-control" value={tenantAdvance} onChange={e => setTenantAdvance(e.target.value)} required />
                  </div>
                </div>
                {tenantError && <div className="alert alert-danger py-1 mt-2">{tenantError}</div>}
                {tenantSuccess && <div className="alert alert-success py-1 mt-2">{tenantSuccess}</div>}
                <div className="modal-footer mt-3">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowAddTenant(false)}>Close</button>
                  <button className="btn btn-success" type="submit">Add Tenant</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Modal for viewing/updating tenant details */}
      {selectedTenant && editTenant && (
        <div className="modal d-block" tabIndex="-1" style={{background: 'rgba(0,0,0,0.3)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Tenant Details</h5>
                <button type="button" className="btn-close" onClick={() => {setSelectedTenant(null); setEditTenant(null);}}></button>
              </div>
              <form onSubmit={handleUpdateTenant}>
                <div className="modal-body">
                  <div className="mb-2">
                    <label>Name</label>
                    <input type="text" className="form-control" value={editTenant.name} onChange={e => setEditTenant({...editTenant, name: e.target.value})} />
                  </div>
                  <div className="mb-2">
                    <label>Email</label>
                    <input type="email" className="form-control" value={editTenant.email} onChange={e => setEditTenant({...editTenant, email: e.target.value})} />
                  </div>
                  <div className="mb-2">
                    <label>Phone</label>
                    <input type="text" className="form-control" value={editTenant.phone} onChange={e => setEditTenant({...editTenant, phone: e.target.value})} />
                  </div>
                  <div className="mb-2">
                    <label>Room No</label>
                    <input type="text" className="form-control" value={editTenant.roomNo} onChange={e => setEditTenant({...editTenant, roomNo: e.target.value})} />
                  </div>
                  <div className="mb-2">
                    <label>Rent</label>
                    <input type="number" className="form-control" value={editTenant.rentAmount} onChange={e => setEditTenant({...editTenant, rentAmount: parseInt(e.target.value)})} />
                  </div>
                  <div className="mb-2">
                    <label>Advance</label>
                    <input type="number" className="form-control" value={editTenant.advancePaid} onChange={e => setEditTenant({...editTenant, advancePaid: parseInt(e.target.value)})} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => {setSelectedTenant(null); setEditTenant(null);}}>Close</button>
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="mb-4">
        <h5>Awaiting Tenant Registration</h5>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Name</th><th>Email</th><th>Room</th><th>Rent</th><th>Advance</th>
              </tr>
            </thead>
            <tbody>
              {awaitingRegistration.length === 0 && <tr><td colSpan="5">No tenants awaiting registration.</td></tr>}
              {awaitingRegistration.map(t => (
                <tr key={t.tenantId} onClick={() => handleSelectTenant(t)} style={{cursor:'pointer'}}>
                  <td>{t.name}</td><td>{t.email}</td><td>{t.roomNo}</td><td>₹{t.rentAmount}</td><td>₹{t.advancePaid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mb-4">
        <h5>Pending Approvals (Registered Tenants)</h5>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Name</th><th>Email</th><th>Room</th><th>Rent</th><th>Advance</th><th>Approve</th>
              </tr>
            </thead>
            <tbody>
              {pendingTenants.length === 0 && <tr><td colSpan="6">No pending tenants.</td></tr>}
              {pendingTenants.map(t => (
                <tr key={t.tenantId} style={{cursor:'pointer'}}>
                  <td onClick={() => handleSelectTenant(t)}>{t.name}</td>
                  <td onClick={() => handleSelectTenant(t)}>{t.email}</td>
                  <td onClick={() => handleSelectTenant(t)}>{t.roomNo}</td>
                  <td onClick={() => handleSelectTenant(t)}>₹{t.rentAmount}</td>
                  <td onClick={() => handleSelectTenant(t)}>₹{t.advancePaid}</td>
                  <td><button className="btn btn-success btn-sm" onClick={e => {e.stopPropagation(); handleApproveTenant(t.tenantId);}}>Approve</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mb-4">
        <h5>Tenant History</h5>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Name</th><th>Email</th><th>Room</th><th>Status</th><th>Last Paid</th><th>Vacate</th>
              </tr>
            </thead>
            <tbody>
              {tenants.length === 0 && <tr><td colSpan="6">No tenants.</td></tr>}
              {tenants.map(t => (
                <tr key={t.tenantId} onClick={() => handleSelectTenant(t)} style={{cursor:'pointer'}}>
                  <td>{t.name}</td><td>{t.email}</td><td>{t.roomNo}</td>
                  <td>{t.status}</td><td>{t.lastPaidDate || '-'}</td>
                  <td>{!t.vacated && t.approved ? <button className="btn btn-warning btn-sm" onClick={() => handleVacateTenant(t.tenantId)}>Vacate</button> : <span className="badge bg-secondary">Vacated</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- Tenant Dashboard: Stylish, Modern, All Fields ---
function TenantDashboardV2({ data }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [tenant, setTenant] = useState(null);

  function handleLogin(e) {
    e.preventDefault();
    const t = data.tenants.find(t => t.email === email && t.phone === password && t.approved && !t.vacated);
    if (t) {
      setTenant(t);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials or not approved');
    }
  }

  if (!tenant) {
    return (
      <div className="glass my-4 animate__animated animate__fadeInUp" style={{maxWidth: 420, margin: '0 auto', boxShadow:'0 8px 32px 0 rgba(31,38,135,0.15)', borderRadius:'16px'}}>
        <h2 className="mb-3 text-center text-primary"><i className="bi bi-people"></i> Tenant Login</h2>
        <form onSubmit={handleLogin} className="p-3">
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone (as password)</label>
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {loginError && <div className="alert alert-danger py-1">{loginError}</div>}
          <button className="btn btn-primary w-100" type="submit">Login</button>
        </form>
      </div>
    );
  }

  // Tenant dashboard content (read-only, stylish)
  const payments = data.payments.filter(p => p.tenantId === tenant.tenantId);
  return (
    <div className="glass my-4 animate__animated animate__fadeInUp" style={{maxWidth: 600, margin: '0 auto', boxShadow:'0 8px 32px 0 rgba(31,38,135,0.15)', borderRadius:'16px'}}>
      <div className="d-flex align-items-center mb-4">
        <img src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png" alt="Tenant" style={{width:60, height:60, borderRadius:'50%', marginRight:20}} />
        <div>
          <h2 className="mb-1 text-success">Welcome, {tenant.name}</h2>
          <span className="badge bg-info">Room {tenant.roomNo}</span>
        </div>
      </div>
      <div className="row mb-4 g-3">
        <div className="col-md-6">
          <div className="card glass shadow-sm">
            <div className="card-body">
              <h6 className="card-title">Email</h6>
              <p className="card-text">{tenant.email}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card glass shadow-sm">
            <div className="card-body">
              <h6 className="card-title">Phone</h6>
              <p className="card-text">{tenant.phone}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card glass shadow-sm">
            <div className="card-body">
              <h6 className="card-title">Rent Amount</h6>
              <p className="card-text">₹{tenant.rentAmount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card glass shadow-sm">
            <div className="card-body">
              <h6 className="card-title">Advance Paid</h6>
              <p className="card-text">₹{tenant.advancePaid}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card glass shadow-sm">
            <div className="card-body">
              <h6 className="card-title">Status</h6>
              <p className="card-text"><span className={`badge ${tenant.status==='Approved'?'bg-success':'bg-warning'}`}>{tenant.status}</span></p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card glass shadow-sm">
            <div className="card-body">
              <h6 className="card-title">Last Paid Date</h6>
              <p className="card-text">{tenant.lastPaidDate || '-'}</p>
            </div>
          </div>
        </div>
      </div>
      <h5 className="mt-4 mb-2">Payment History</h5>
      <ul className="list-group mb-4">
        {payments.length === 0 && <li className="list-group-item">No payments yet.</li>}
        {payments.map(p => (
          <li className="list-group-item" key={p.paymentId}>
            <span className="me-2"><i className="bi bi-currency-rupee"></i>{p.amount}</span>
            <span className="me-2">{p.month}</span>
            <span className="text-muted">{p.paymentDate}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- Tenant Registration Page (must match owner-added tenant) ---
function TenantRegistration({ data, setData }) {
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');

  function handleRegister(e) {
    e.preventDefault();
    // Must match a tenant added by owner, not yet registered
    const tenant = data.tenants.find(t => t.email === regEmail && t.phone === regPhone && !t.registered && !t.vacated);
    if (!tenant) {
      setRegError('No matching tenant found. Ask owner to add you first.');
      setRegSuccess('');
      return;
    }
    // Mark as registered, status changes to Awaiting Approval
    const newTenants = data.tenants.map(t => t.tenantId === tenant.tenantId ? { ...t, registered: true, status: 'Awaiting Approval' } : t);
    setData({ ...data, tenants: newTenants });
    setRegSuccess('Registration successful! Wait for owner approval.');
    setRegError('');
    setRegEmail(''); setRegPhone('');
  }

  return (
    <div className="glass my-4 animate__animated animate__fadeInUp" style={{maxWidth: 420, margin: '0 auto'}}>
      <h2 className="mb-3 text-center"><i className="bi bi-people"></i> Tenant Registration</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={regEmail} onChange={e => setRegEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone (as password)</label>
          <input type="text" className="form-control" value={regPhone} onChange={e => setRegPhone(e.target.value)} required />
        </div>
        {regError && <div className="alert alert-danger py-1">{regError}</div>}
        {regSuccess && <div className="alert alert-success py-1">{regSuccess}</div>}
        <button className="btn btn-success w-100" type="submit">Register</button>
      </form>
      <div className="form-text mt-2">Ask your owner to add you first. Use the same email and phone.</div>
    </div>
  );
}

// --- Modern Footer ---
function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container text-center">
        <div className="mb-2">
          <img src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png" alt="Logo" style={{width:40,height:40,borderRadius:'50%',marginRight:8}} />
          <span className="fw-bold">Smart Rent Management</span>
        </div>
        <small>&copy; {new Date().getFullYear()} All rights reserved. Made with <span style={{color:'#f87171'}}>❤</span> for modern web.</small>
      </div>
    </footer>
  );
}

// --- Main App ---
// --- About Us, Features, Contact Tabs ---
function AboutUsTab() {
  return (
    <div className="glass my-4 animate__animated animate__fadeInUp" style={{maxWidth:700,margin:'0 auto'}}>
      <h2 className="mb-3 text-center text-primary"><i className="bi bi-info-circle"></i> About Us</h2>
      <p className="lead">Smart Rent Management is a modern web app designed for building owners and tenants to manage rent, automate reminders, and streamline communication. Built with React and Bootstrap for a stylish, responsive experience.</p>
      <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80" className="img-fluid rounded-4 border border-3 border-info shadow-lg mb-3" alt="About" />
      <p>Our mission is to make rent management simple, efficient, and beautiful for everyone.</p>
    </div>
  );
}
function FeaturesTab() {
  return (
    <div className="glass my-4 animate__animated animate__fadeInUp" style={{maxWidth:700,margin:'0 auto'}}>
      <h2 className="mb-3 text-center text-success"><i className="bi bi-stars"></i> Features</h2>
      <ul className="list-group mb-3">
        <li className="list-group-item">Owner & Tenant Registration/Login</li>
        <li className="list-group-item">Add, Approve, and Manage Tenants</li>
        <li className="list-group-item">Automated Rent Reminders</li>
        <li className="list-group-item">Modern, Responsive UI</li>
        <li className="list-group-item">Glassmorphism, Bootstrap, Animations</li>
      </ul>
      <img src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80" className="img-fluid rounded-4 border border-3 border-success shadow-lg mb-3" alt="Features" />
    </div>
  );
}
function ContactTab() {
  return (
    <div className="glass my-4 animate__animated animate__fadeInUp" style={{maxWidth:700,margin:'0 auto'}}>
      <h2 className="mb-3 text-center text-info"><i className="bi bi-envelope"></i> Contact</h2>
      <p className="lead">Have questions or feedback? Reach out to us!</p>
      <form className="mb-3">
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Your Name" required />
        </div>
        <div className="mb-3">
          <input type="email" className="form-control" placeholder="Your Email" required />
        </div>
        <div className="mb-3">
          <textarea className="form-control" rows={3} placeholder="Your Message" required></textarea>
        </div>
        <button className="btn btn-info w-100" type="submit">Send Message</button>
      </form>
      <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" className="img-fluid rounded-4 border border-3 border-primary shadow-lg mb-3" alt="Contact" />
    </div>
  );
}

function App() {
  const [owner, setOwner] = useState(null);
  const [data, setData] = useState(loadData());
  const [page, setPage] = useState('home'); // home, owner, tenant, tenantReg, about, features, contact
  const [showOwnerLogin, setShowOwnerLogin] = useState(false);
  const [showOwnerReg, setShowOwnerReg] = useState(false);

  useEffect(() => { saveData(data); }, [data]);

  function handleOwnerLogin(ownerObj, dataObj) {
    setOwner(ownerObj);
    setData(dataObj);
    setPage('owner');
    setShowOwnerLogin(false);
    setShowOwnerReg(false);
  }
  function handleLogout() {
    setOwner(null);
    setPage('home');
  }

  // Modal for Owner Login
  function OwnerLoginModal() {
    return (
      <div className="modal d-block" tabIndex="-1" style={{background: 'rgba(0,0,0,0.3)'}}>
        <div className="modal-dialog">
          <div className="modal-content glass animate__animated animate__fadeInUp">
            <div className="modal-header">
              <h5 className="modal-title"><i className="bi bi-person-badge"></i> Owner Login</h5>
              <button type="button" className="btn-close" onClick={() => setShowOwnerLogin(false)}></button>
            </div>
            <div className="modal-body">
              <RegistrationLogin onOwnerLogin={handleOwnerLogin} showLoginOnly />
            </div>
          </div>
        </div>
      </div>
    );
  }
  // Modal for Owner Registration
  function OwnerRegModal() {
    return (
      <div className="modal d-block" tabIndex="-1" style={{background: 'rgba(0,0,0,0.3)'}}>
        <div className="modal-dialog">
          <div className="modal-content glass animate__animated animate__fadeInUp">
            <div className="modal-header">
              <h5 className="modal-title"><i className="bi bi-person-badge"></i> Owner Registration</h5>
              <button type="button" className="btn-close" onClick={() => setShowOwnerReg(false)}></button>
            </div>
            <div className="modal-body">
              <RegistrationLogin onOwnerLogin={handleOwnerLogin} showRegisterOnly />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar page={page} setPage={setPage} />
      {page === 'home' && <HeroSection />}
      <div className="container">
        {page === 'home' && (
          <>
            <ul className="nav nav-tabs mb-4 justify-content-center">
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => setShowOwnerLogin(true)}>Owner Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => setShowOwnerReg(true)}>Owner Registration</a>
              </li>
              <li className={page==='tenant' ? 'nav-item active' : 'nav-item'}>
                <a className="nav-link" href="#" onClick={() => setPage('tenant')}>Tenant Login</a>
              </li>
              <li className={page==='tenantReg' ? 'nav-item active' : 'nav-item'}>
                <a className="nav-link" href="#" onClick={() => setPage('tenantReg')}>Tenant Registration</a>
              </li>
            </ul>
            {showOwnerLogin && <OwnerLoginModal />}
            {showOwnerReg && <OwnerRegModal />}
          </>
        )}
        {page === 'owner' && owner && <OwnerDashboardV2 owner={owner} data={data} setData={setData} onLogout={handleLogout} />}
        {page === 'tenant' && <TenantDashboardV2 data={data} />}
        {page === 'tenantReg' && <TenantRegistration data={data} setData={setData} />}
        {page === 'about' && <AboutUsTab />}
        {page === 'features' && <FeaturesTab />}
        {page === 'contact' && <ContactTab />}
      </div>
      <Footer />
    </>
  );
}

// Render the App
ReactDOM.createRoot(document.getElementById('root')).render(<App />);