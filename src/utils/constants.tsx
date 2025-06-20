// constants.js
export const GENDER_OPTIONS = ["Male", "Female", "Other"];
export const NATIONALITY_OPTIONS = ["India", "Other"];
export const INITIAL_VALUES = {
  fullName: "John Doe",
  gender: GENDER_OPTIONS[0], // Default to the first value
  dob: "1990-01-01",
  address: "123 Main Street",
  pincode: "12345",
  mobileNo: "1234567890",
  email: "john.doe@example.com",
  nationality: NATIONALITY_OPTIONS[0], // Default to the first value
  password: "",
  confirmPassword: "",
};
export const accountDetails = {
  consumerName: "Ramanjaneyulu.B",
  consumerNo: "103112022224645",
  totalGiveHelp: "₹17150.00",
  totalReceivedHelp: "₹74500.00",
  registrationTime: "03-11-2022 10:46 PM",
};
export const PROFILE_DATA = {
  phoneNumber: "1234567890",
  gender: "Male",
  dateOfBirth: "1990-01-01",
  BloodGroup: "O +ve",
  State: "Andhra Pradesh",
  District: "Krishna",
  permanentAddress: {
    addressLine1: "123 Main Street",
    addressLine2: "pobe",
    houseNo: "A-1",
    postalCode: "12345",
  },
  livingAddress: {
    addressLine1: "456 Park Avenue",
    addressLine2: "nenu cheppanu chi po",
    houseNo: "B-2",
    postalCode: "67890",
  },
  socialMediaContacts: {
    whatsappNumber: "9876543210",
  },
  upiDetails: {
    bankUPIID: "bankupi@example.com",
    bhimUPI: "bhimupi@example.com",
    gpay: "gpay@example.com",
    phonePe: "phonepe@example.com",
    paytm: "paytm@example.com",
    whatsappPay: "whatsapppay@example.com",
  },
};
export const BLOOD_GROUP_LIST = [
  "O +ve,O -ve,A +ve,A -ve,B +ve,B -ve,AB +ve,AB -ve",
];
export const StateList = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
];
export const DISTRICTS_IN_INDIA = {
  "Andhra Pradesh": [
    "Anantapur",
    "Chittoor",
    "East Godavari",
    "Guntur",
    "Krishna",
  ],
  "Arunachal Pradesh": [
    "Tawang",
    "West Kameng",
    "East Kameng",
    "Papum Pare",
    "Kurung Kumey",
  ],
  Assam: ["Baksa", "Barpeta", "Biswanath", "Cachar", "Darrang"],
  Bihar: ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai"],
  Chhattisgarh: ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara"],
  Goa: ["North Goa", "South Goa"],
  Gujarat: ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha"],
  Haryana: ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad"],
  "Himachal Pradesh": ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur"],
  Jharkhand: ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka"],
  Karnataka: [
    "Bagalkot",
    "Bangalore Rural",
    "Bangalore Urban",
    "Belgaum",
    "Bellary",
  ],
  Kerala: ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod"],
  "Madhya Pradesh": [
    "Agar Malwa",
    "Alirajpur",
    "Anuppur",
    "Ashoknagar",
    "Balaghat",
  ],
  Maharashtra: ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed"],
  Manipur: [
    "Bishnupur",
    "Chandel",
    "Churachandpur",
    "Imphal East",
    "Imphal West",
  ],
  Meghalaya: [
    "East Garo Hills",
    "East Jaintia Hills",
    "East Khasi Hills",
    "North Garo Hills",
    "Ri Bhoi",
  ],
  Mizoram: ["Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei"],
  Nagaland: ["Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung"],
  Odisha: ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak"],
  Punjab: ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib"],
  Rajasthan: ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer"],
  Sikkim: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
  "Tamil Nadu": [
    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
  ],
  Telangana: [
    "Adilabad",
    "Bhadradri Kothagudem",
    "Hyderabad",
    "Jagtial",
    "Jangaon",
  ],
  Tripura: ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala"],
  "Uttar Pradesh": ["Agra", "Aligarh", "Allahabad", "Ambedkar Nagar", "Amethi"],
  Uttarakhand: ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun"],
  "West Bengal": [
    "Alipurduar",
    "Bankura",
    "Birbhum",
    "Cooch Behar",
    "Dakshin Dinajpur",
  ],
  "Andaman and Nicobar Islands": [
    "Nicobar",
    "North and Middle Andaman",
    "South Andaman",
  ],
  Chandigarh: ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": [
    "Daman",
    "Diu",
    "Dadra and Nagar Haveli",
  ],
  Delhi: [
    "Central Delhi",
    "East Delhi",
    "New Delhi",
    "North Delhi",
    "North East Delhi",
  ],
  Lakshadweep: ["Lakshadweep"],
  Puducherry: ["Karaikal", "Mahe", "Puducherry", "Yanam"],
};

export const GIVE_HELP_TABLE_HEADER = [
  "Stage",
  "ConsumerNo",
  "ConsumerName",
  "MobileNumber",
  "Give Help",
  "status",
  "Details",
  "Payment Status",
];
export const GIVE_HELP_DUMMY_DATA = [
  {
    stage: "1",
    consumerNo: "131102022004218",
    consumerName: "Shaziya shaik",
    mobile: "+917207286786",
    giveHelpAmount: "150",

    status: "Paid",
    details: "",
    paymentStatus: "",
  },
  {
    stage: "2",
    consumerNo: "130102022232314",
    consumerName: "Shaik Shabbeer",
    mobile: "+919985285799",
    giveHelpAmount: "200",
    status: "Paid",
    details: "",
    paymentStatus: "",
  },
  {
    stage: "3",
    consumerNo: "130102022141356",
    consumerName: "Bakka Drakshavalli",
    mobile: "+918639455456",
    giveHelpAmount: "400",
    status: "Paid",
    details: "",
    paymentStatus: "",
  },
  {
    stage: "4",
    consumerNo: "130102022070342",
    consumerName: "Sk Mohammed sadik",
    mobile: "+919553655078",
    giveHelpAmount: "600",
    status: "Paid",
    details: "",
    paymentStatus: "",
  },
  {
    stage: "5",
    consumerNo: "128102022162927",
    consumerName: "Shaik mahaboob subhani",
    mobile: "+919394160699",
    giveHelpAmount: "800",
    status: "Paid",
    details: "",
    paymentStatus: "",
  },
  {
    stage: "6",
    consumerNo: "127102022192319",
    consumerName: "Shaik farzana",
    mobile: "+919666717631",
    giveHelpAmount: "1000",
    status: "Paid",
    details: "",
    paymentStatus: "",
  },
  {
    stage: "7",
    consumerNo: "120092022185737",
    consumerName: "K Jyothsna",
    mobile: "+917075346817",
    giveHelpAmount: "2000",
    status: "Paid",
    details: "",
    paymentStatus: "",
  },
  {
    stage: "8",
    consumerNo: "115092022211124",
    consumerName: "VejendlaMeghana",
    mobile: "+917794052105",
    giveHelpAmount: "3000",
    status: "Paid",
    details: "",
    paymentStatus: "",
  },
  {
    stage: "9",
    consumerNo: "166170048740",
    consumerName: "Vejendla Manikya Rao",
    mobile: "+918297303949",
    giveHelpAmount: "4000",
    status: "Paid",
    details: "",
    paymentStatus: "",
  },
  {
    stage: "10",
    consumerNo: "166170019551",
    consumerName: "Donepudi jyothirmai",
    mobile: "+919908750468",
    giveHelpAmount: "5000",
    status: "Paid",
    details: "",
    paymentStatus: "",
  },
];
export const MY_INVITATIONS_HEADER_DATA = [
  "sno",
  "consumerNo",
  "EmailId",
  "consumerName",
  "placedUnder",
  "mobile",
];
export const MY_INVITATIONS_DATA = [
  {
    sno: "1",
    consumerNo: "104112022132751",
    EmailId: "pprabhat@example.com",
    consumerName: "Leela pavan kasi",
    placedUnder: "Ramanjaneyulu.B",
    mobile: "+917207286786",
  },
  {
    sno: "2",
    consumerNo: "104112022134615",
    EmailId: "rustumramu@gmail.com",
    consumerName: "Rukmini Garlapati",
    placedUnder: "Ramanjaneyulu.B",
    mobile: "+919290625210",
  },
];

export const TRANSACTION_HISTORY_DUMMY_DATA = [
  {
    ConsumerNo: "121112022215453",
    ConsumerName: "Dasari kiran",
    Stage: "5",
    MobileNumber: "+918919683763",
    ReceiveHelpAmount: "Rs. 800",
    Date: "",
  },
  {
    ConsumerNo: "121112022093547",
    ConsumerName: "Tharanath",
    Stage: "8",
    MobileNumber: "+917093028413",
    ReceiveHelpAmount: "Rs. 3000",
    Date: "",
  },
  {
    ConsumerNo: "120112022110422",
    ConsumerName: "N. M. Murali Krishna",
    Stage: "5",
    MobileNumber: "+918074019641",
    ReceiveHelpAmount: "Rs. 800",
    Date: "",
  },
  {
    ConsumerNo: "120112022102222",
    ConsumerName: "Bhattu Ramesh",
    Stage: "9",
    MobileNumber: "+919000313312",
    ReceiveHelpAmount: "Rs. 4000",
    Date: "",
  },
  {
    ConsumerNo: "119112022200547",
    ConsumerName: "K anupama",
    Stage: "5",
    MobileNumber: "+918686337111",
    ReceiveHelpAmount: "Rs. 800",
    Date: "",
  },
  {
    ConsumerNo: "115112022121709",
    ConsumerName: "Y Anand",
    Stage: "4",
    MobileNumber: "+917306695830",
    ReceiveHelpAmount: "Rs. 600",
    Date: "",
  },
  {
    ConsumerNo: "119112022112837",
    ConsumerName: "P Janu Khan",
    Stage: "7",
    MobileNumber: "+919014455385",
    ReceiveHelpAmount: "Rs. 2000",
    Date: "",
  },
  {
    ConsumerNo: "121112022185757",
    ConsumerName: "Y Sushma",
    Stage: "5",
    MobileNumber: "+919603245177",
    ReceiveHelpAmount: "Rs. 800",
    Date: "",
  },
  {
    ConsumerNo: "121112022163128",
    ConsumerName: "TUMULURI MADHAVI",
    Stage: "7",
    MobileNumber: "+917207123273",
    ReceiveHelpAmount: "Rs. 2000",
    Date: "",
  },
  {
    ConsumerNo: "123112022153510",
    ConsumerName: "M Suman",
    Stage: "5",
    MobileNumber: "+919666351128",
    ReceiveHelpAmount: "Rs. 800",
    Date: "",
  },
  {
    ConsumerNo: "124112022180549",
    ConsumerName: "N Divya",
    Stage: "4",
    MobileNumber: "+919989749023",
    ReceiveHelpAmount: "Rs. 600",
    Date: "",
  },
  {
    ConsumerNo: "126112022173742",
    ConsumerName: "Durga sahitya",
    Stage: "7",
    MobileNumber: "+919703536622",
    ReceiveHelpAmount: "Rs. 2000",
    Date: "",
  },
  {
    ConsumerNo: "127112022103513",
    ConsumerName: "KVK Bhaskar rao",
    Stage: "10",
    MobileNumber: "+919849509928",
    ReceiveHelpAmount: "Rs. 5000",
    Date: "",
  },
  {
    ConsumerNo: "128112022195100",
    ConsumerName: "M Sai Lakshmi",
    Stage: "4",
    MobileNumber: "+919989424335",
    ReceiveHelpAmount: "Rs. 600",
    Date: "",
  },
];
export const TRANSACTION_HISTORY_TABLE_HEADER = [
  "ConsumerNo",
  "ConsumerName",
  "Stage",
  "MobileNumber",
  "Receive Help Amount",
  "Date",
];
export const rowCount = 5;

export const viewOrgchart_dummyData = [
  {
    parentConsumerNo: "O4AA4O0000001",
    stage: "0",
    consumerNo_child: "O4AA4O0000001",
    consumerName: "Ramanjneyullu B",
    consumer_Mobile: "9000000001",
    consumer_HelpingAmount: "1000",
    paymentStatus: "PAID",
    referralAmount: "NA",
  },
];
// utils/config.js or wherever config is defined
declare global {
  interface Window {
    _env_?: {
      API_BASE_URL?: string;
      [key: string]: any;
    };
  }
}

//const apiBase = 'http://api.one4all-all4one.com:8080'
const apiBase = "http://localhost:9090";  
export const baseURL = apiBase;
export const baseApiURL = `${baseURL}/api`;
export const loginUrl = `${baseApiURL}/login`;
export const adminLoginUrl = `${baseApiURL}/admin/login`;
export const registrationUrl = `${baseApiURL}/register`;
export const adminRegistrationUrl = `${baseApiURL}/admin/register`;
export const ONE4ALL_USER_RO = "ONE4ALL_USER_RO";
export const ONE4ALL_ADMIN_RW = "ONE4ALL_ADMIN_RW";
export const defaultRoute= "/dashboard/my-account";
export const profileUrl= `${baseApiURL}/member/profile`;
export const resetPasswordRequestUrl = `${baseApiURL}/reset-password-request`;
export const resetPasswordConfirmUrl = `${baseApiURL}/reset-password/confirm`;
