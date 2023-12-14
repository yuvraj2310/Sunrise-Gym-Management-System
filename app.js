const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/mongo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));


app.set('view engine', 'ejs');

app.use(express.static('public'));


app.use(express.urlencoded({ extended: false }));

const Member = require('./models/member');
const Staff = require('./models/staff');
const PaymentStatus = require('./models/paymentStatus');



app.get('/', (req, res) => {
  res.render('home');
});



app.get('/members', async (req, res) => {
  try {
    const members = await Member.find();
    res.render('index', { members });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});



app.post('/delete/:id', async (req, res) => {
  const memberId = req.params.id;

  try {
    await Member.findByIdAndRemove(memberId);
    const successMessage = 'Member deleted successfully';
    res.redirect(`/members?message=Member%20deleted%20successfully`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/add', (req, res) => {
  res.render('add-member');
});
app.get('/add', (req, res) => {
  res.render('add-member');
});


app.post('/add', async (req, res) => {
  const { name, email, phone, membershipType } = req.body;

  try {
    const newMember = new Member({ name, email, phone, membershipType });
    await newMember.save();
    res.redirect('/members'); 
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/staff', async (req, res) => {
  try {
    const staffMembers = await Staff.find();
    res.render('staff/index', { staffMembers });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/staff/add', (req, res) => {
  res.render('staff/add');
});

app.post('/staff', async (req, res) => {
  const { name, address, phone, salary, category } = req.body;
  const newStaffMember = new Staff({ name, address, phone, salary, category });

  try {
    await newStaffMember.save();
    res.redirect('/staff');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/staff/delete/:id', async (req, res) => {
  const memberId = req.params.id;

  try {
    await Staff.findByIdAndRemove(memberId);
    res.redirect('/staff');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/subscription', (req, res) => {
  res.render('subscription'); 
});



app.get('/paymentStatus', async (req, res) => {
  try {
    const paymentStatusList = await PaymentStatus.find();
    res.render('paymentStatus', { paymentStatusList });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/paymentStatus/add', (req, res) => {
  const paymentStatus = { 
    name: '',
    phone: '',
    membershipType: 'basic', 
    paymentStatus: 'done', 
    amount: 0, 
    dateOfJoining: '',
    dateOfExpiring: '',
  };
  res.render('paymentStatusForm', { paymentStatus });
});


app.post('/paymentStatus/add', async (req, res) => {
  try {
    const { name, phone, membershipType, paymentStatus, amount, dateOfJoining, dateOfExpiring } = req.body;

    const parsedDateOfJoining = dateOfJoining ? new Date(dateOfJoining) : null;
    const parsedDateOfExpiring = dateOfExpiring ? new Date(dateOfExpiring) : null;

    if (!parsedDateOfJoining || isNaN(parsedDateOfJoining) || !parsedDateOfExpiring || isNaN(parsedDateOfExpiring)) {
      return res.status(400).send('Invalid date format');
    }

    const payment = new PaymentStatus({
      name,
      phone,
      membershipType,
      paymentStatus,
      amount, 
      dateOfJoining: parsedDateOfJoining,
      dateOfExpiring: parsedDateOfExpiring,
    });

    await payment.save();

    res.redirect('/paymentStatus'); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});





app.post('/paymentStatus/delete/:id', async (req, res) => {
  const paymentId = req.params.id;

  try {
    await PaymentStatus.findByIdAndRemove(paymentId);

    res.redirect('/paymentStatus'); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});








app.get('/about', (req, res) => {
  res.render('about'); 
});




app.get('/revenue', async (req, res) => {
  try {
    const paymentStatusList = await PaymentStatus.find();
    const totalAmount = paymentStatusList.reduce((acc, payment) => acc + (parseFloat(payment.amount) || 0), 0);

    const staffList = await Staff.find();
    const totalSalary = staffList.reduce((acc, staff) => acc + (parseFloat(staff.salary) || 0), 0);

    const revenue = totalAmount - totalSalary;



    res.render('revenue', { totalAmount, totalSalary, revenue }); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});






// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
