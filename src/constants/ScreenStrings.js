import React from "react";
import LocalizedStrings from "react-native-localization";
const strings = new LocalizedStrings({
  English: {
    MediPulse: "MediPulse",
    BookNow: "Book Now",
    LatestEvent: "Latest Event",
    heading:'Simplest way to manage',
    your:'your',
    HealthRecord:'Health Record',
    notMatch:'Password and confirm password do not match',
    DB_NAME: 'UserDatabase.db',
    login:{
      Login:'Login',
      Email:'Email *',
      Password:'Password *',
      ForgetPassword:'Forget Password?',
      DontAccount:`Don't have an Account? `,
      Signup:'Signup Now',
    },
    forgotpassword:{
      ForgotPassword:"Forgot Password",
      Pleaseregistered:'Please enter your registered',
      emailaddress:'email address',
      Submit:'Submit',
    },
    enterOtp:{
      EnterOtp:"Enter OTP",
      PleaseEnterOtp:'Otp sent to the email address you provided',
      otp:'Enter Otp',
      Submit:'Submit',
    },
    ConfirmPassword:{
      EnterPassword:"Enter new password",
      PleaseEnterPass:'Please enter your New Password',
      password:'Enter Password',
      Submit:'Submit',
    },
    singup:{
      title:'Signup',
      OtherInfo:'Other Info',
      GeneralInfo:'General Info',
      FirstName:'First Name *',
      LastName:'Last Name *',
      Email:'Email *',
      Password:'Password *',
      ConfirmPassword:'Confirm Password *',
      Next:'Next',
      Alreadyaccount:'Already have account?',
      Login:'Log in',
      ContactNumber:'Contact Number (eg: +12345464778) *',
      Address:'Address *',
      City:'City *',
      State:'State *',
      InsuranceNumber:'Insurance Number',
      InsuranceProvider:'Insurance Provider',
      Submit:'Submit'
    },
    permission_text: {
      permission_decline: 'User declined messaging permissions :(',
      allow_text: 'Please Allow to procced further',
      not_allow: "Don't Allow",
      allow: 'Allow',
      logout_text: 'Are you sure you want to logout?',
      yes_text: 'Yes',
      no_text: 'No',
      exit_txt: 'Are you sure you want to exit the application?',
      location_denied:
        'You have denied request to access location. Click here to enable LOCATION permission from Settings.',
    },
    
  
    auth: {
      welcome: 'Welcome to Ultimate Security!',
      continue: 'Sign in to Continue',
      no_account: 'Are you a new user?',
      sign_up: 'Sign Up',
      sign_in: 'Login',
      keep_in: 'Keep me signed in',
      enter_pass: ' Enter Password',
      forget: 'Forget Password ?',
      set_pass: 'Set New Password',
      auth: 'Two factor authentication ',
      code_sent: 'Verification Code Sent on',
      continue: 'Continue',
      cancel: 'Cancel',
      reset: 'Reset password',
      enterOtpTxt: 'Enter OTP',
      not_receive: 'Did not receive code?',
      resend: 'Resend Code',
      already_acount: 'Already have an account?',
      signUp_heading: 'Enter your details for creating account. Thanks',
      personal_details: 'Personal Details',
      add_emergnecy: 'Add Emergency Contact',
      save: 'Save & Next',
      profile: 'Profile Creation',
      login: 'Login',
      enter_email: 'Enter Email',
      register: 'Register',
      signUp: 'SignUp',
      enter_name: 'Enter Name',
      enter_pass: 'Enter Password',
      enter_currentPass: 'Enter Current Password',
      enter_newPass: 'Enter New Password',
      enter_confirmPass: 'Confirm Password',
      enter_address: 'Enter Address',
      enter_phone: 'ENter Mobile Number',
      enter_cnfrmPass: 'Enter Confirm Password',
      exitUser: 'Existing User?',
      forgetText:
        "Please enter your email address and we'll send you instructions on how to reset your password",
      otpText: 'Please enter your 6 digit OTP you have received on your email.',
      otp: 'OTP',
      enter_description: 'Add Description'
    },
    form: {
      phone: 'Phone Number',
      mobile: 'Mobile Number',
      pass: 'Password',
      newPass: 'New Password',
      confirmPass: 'Confirm Passowrd',
      email: 'E-mail',
      confirm: 'Confirm Password',
      fname: 'Full Name',
      gender: 'Gender',
      dob: 'Date of Birth',
      blood_grp: 'Blood Group',
      martial: 'Marital Status',
      m_name: 'Middle Name',
      l_name: 'Last Name',
      age: 'Age',
      address: 'Address',
      neighbor: 'Neighborhood',
      country: 'Country',
      Region: 'Region',
      Province: 'Province',
      Department: 'Department',
      City: 'City',
      Village: 'Village',
      Pincode: 'Pincode',
      name: 'Name',
      relationship: 'Relationship',
      currentPass: 'Current Password',
      newPass: 'New Password',
      confirmPass: 'Confirm Password',
    },
    validation: {
      diff_pass:
        'Your new password must be different to previously used passwords.',
      enter_code: 'Enter 4 digit code',
      invalid_email: 'Please enter valid email address',
      invalid_mobile: 'Please enter valid contact number',
      invalid_pass: 'Password must be at least 8 characters long and contain at least one letter, one digit, and one special character',
      invalid_Password: 'Please enter confirm password',
      missing_email: 'Email is missing',
      missing_mobileNo: 'Contact number is missing',
      missing_address: 'Address is missing',
      missing_city: 'City is missing',
      missing_state: 'State is missing',
      missing_insuranceNo: 'Insurance Number is missing',
      missing_insuranceProvider: 'Insurance Provider is missing',
  
      missing_firstName: 'First name is missing',
      missing_lastname: 'Last name is missing',
      invalid_otp: 'Invalid Otp',
      valid_password: 'Please enter valid password',
      missing_password: 'Password is missing',
      empty_fields: 'Please fill all the fields to continue.',
      missing_currentpassword: 'Current Password is missing',
      missing_newPassword: 'New Password is missing',
      missing_confirmPassword: 'Confirm Password is missing',
      match_Pass: 'Your New Password & Current Password is not match',
      uploadImage: 'Please upload Image',
      Password:'Password and confirm password do not match',
      allField: 'Please add all fields',
      missing_sig: 'Please add signature',
     
  
    },
    customAlert: {
      title: 'Alert',
      button: 'Ok',
    },
    dashboard: {
      search: 'Search',
      dash_title: 'Home',
      mySites: 'My Sites',
      mySchedules: 'My Schedules',
      myVisit: 'My Visits',
      profile: 'Profile',
      name: 'Name: ',
      address: 'Address',
      contact: 'Contact',
      area: 'Site Area',
      editProfile: 'Edit Profile',
      updateprofile: 'Update Profile',
      scan: 'Qr Scan',
      notification: 'Notification',
      alarm: 'Alarm',
      adHoc: 'AD-HOC',
      task: 'My Task',
      training: 'Training',
      auditForm: 'Audit Form',
      dynamicForm: 'Dynamic Form',
      induction: 'Induction',
      document: 'Document',
      uploadFile: 'Upload Your File',
      pdfText: 'Upload PDF, DOC,JPEJ & EXCEL only',
      uploadText: 'Upload',
      cancel: 'Cancel',
      submit: 'Submit',
      uploadImageFrom: 'Upload Photo',
      camera: 'Camera',
      gallery: 'Gallery',
      signature: 'Signature',
      startVisit: 'Start Visit',
      endVisit: 'End Visit',
      location: 'Location',
      siteType: 'Site Type',
      uploadSignture: 'Upload Signature',
      expDate: 'Document Expiry Date * ',
      license: 'License',
      setting: 'Setting',
      editProfile: 'Edit Profile',
      changePass: 'Change Password',
      logout: 'Logout',
      logoutText: 'Do you want to logout?',
      no: 'No',
      yes: 'Yes',
      ChangePassword: 'ChangePassword',
      airport: 'Airport',
      checkout: 'Checkout',
      countinueWithScan: 'Continue With Scan',
      countinueWithoutScan: 'Continue Without Scan',
      uploadphoto: 'Upload Photo',
      enterText: 'Please Add some description why you selecting No',
      addPhoto: 'Add Photo',
      duration: 'Duration:',
      startTime: 'Start Time:',
      endTime: 'End Time:',
      siteStatus: 'Site Status:',
      trainigQuestions: 'Training Questions',
      inductionQuestions: 'Induction Questions',
      schedule: "Schedule List",
      siteName: 'Site Name',
      contactPerson: 'Contact Person',
      contactNum: 'Contact Number',
      serviceName: 'Service Name',
      siteInformation: 'Site Information',
      mySchedule: 'My Schedules',
      occurrence: 'Occurrence',
      scheduleName : 'Schedule Name: ',
      date: 'Date: '
  
    },
    server: {
      server_is_not_reachable:
        'The server is not reachable right now, sorry for inconvenience.',
      error: 'Error',
    },
    notification: {
      decline: 'Decline',
      accept: 'Accept',
    },
  

    alert: {
      pass_reset:
        "Your password has been successfully reset Click below to sign in magically.",
      alert_text: "Alert",
    },
    drawer: {
      Patient: "Patient",
      Notifications: "Notifications",
      Setting: "Setting",
      Language: "Language",
      ChangePassword: "Change Password",
      Logout: "Logout",
    },
    home: {
      UpcomingAppointment: "Upcoming Appointment",
      Within24Hr: "Within 24Hr",
      BookNowCard: "Book an Appointment",
      HospitalVisits: "Hospital Visits",
      HealthChecks: "Health Checks",
      Vaccinations: "Vaccinations",
      Documents: "Documents",
      NoDataFound:'No data Found',
      Vitals:'Vitals',
      Height:'Height (cm)',
      Weight:'Weight (Kg)',
      BMI:'BMI',

    },
    appoiments: {
      title: "My Appointments",
      UpcomingAppointment: "Upcoming Appointment",
      NoAppointment: "No Active Appointment",
      Workflow: "Workflow",
      Xray: "Xray",
      Sonography: "Sonography",
      LipidProfile: "Lipid Profile",
      BloodSugar: "Blood Sugar",
      ApptNo: "Appt. No.:",
      Status: "Status:",
    },
    documents: {
      title:'Documents',
      NoDocuments: "No Documents Available",
      Share: "Share",
      SelectedDocuments: "Selected Documents",
      SearchDocument: "Search Document",
    },
    visits: {
      Visits: "Visits",
      NoVisits: "No Visits Available",
    },
    profile: {
      title: "My Profile",
      YourInsurancenumber: "Your Insurance number",
      Allergies: "Allergies",
      BloodType: "Blood Type",
      Height: "Height",
      Weight: "Weight",
      AddType:'Add Type',
      AddWeight:'Add Weight',
      AddHeight:' Add Height',
      BMI: "BMI",
      Pulse: "Pulse",
      HeartRate: "Heart Rate",
      BP: "BP",
      Tobacco: "Tobacco",
      Alcohol: "Alcohol",
      NotAvailable: "Not Available",
    },
    tabNavigater: {
      Home: "Home",
      Appointments: "Appointments",
      Documents: "Documents",
      Visits: "Visits",
      Profile: "Profile",
      // Profile:'Profile',
    },
    editProfile:{
      EditProfile:'Edit Profile',
      GeneralInfo:'General Info',
      OtherInfo:'Other Info',
      MedicalInfo:'Medical Info',
      FirstName:'First Name *',
      LastName:'Last Name *',
      ContactNumber:'Contact Number (eg: +12345464778) *',
      Email:'Email *',
      Next:'Next',
      Address:'Address *',
      City:'City *',
      State:'State *',
      InsuranceNumber:'Insurance Number',
      Back:'Back',
      DOB:'D.O.B',
      Gender:'Gender',
      Male:'Male',
      Female:'Female',
      Other:'Other',
      SelectBloodGroup:'Select Blood Group',
      Select:'Select',
      Allergies:'Allergies',
      Height:'Height (CM)',
      Weight:'Weight (KG)',
      Tobacco:'Tobacco(Per day)',
      Alcohol:'Alcohol(Per day)',
      BMI:'BMI',
      Medication:'Medication',
      Submit:'Submit'
    },
    model:{
      cancelappointment:'Are you sure want to cancel appointment?',
      cancelmessage:'This will cancel your appointment.',
      CancelReason:'Cancel Reason',
      addreason:'    add reason',
      Cancel:'Cancel',
      Confirm:'Confirm',
      WaitingRoom:'Waiting Room',
      Status:'Status:',
      cancel:'cancel',
      Reschedule:'Reschedule',
      CancelAppointments:'Cancel  Appointment',
      ScanQR:'Scan QR'

    },
    reschedule:{
      Reschedule:'Reschedule',
      AppointmentType:'Appointment Type',
      Visit:'Visit',
      Vaccination:'Vaccination',
      BookingDate:'Select Booking Date',
      Select:'Select',
      BookingTime:'Select Booking Time',
      RescheduleAppointment:'Reschedule Appointment'
    }
  },
  ジャパニーズ: {
    MediPulse: "手帳",
    BookNow: "今予約する",
    LatestEvent: "最新のイベント",
    heading:'最も簡単な管理方法',
    your:'あなたの',
    HealthRecord:'健康記録',
    notMatch:'パスワードと確認用パスワードが一致しません',

    DB_NAME: 'UserDatabase.db',
    login:{
      Login:'ログイン',
      Email:'Eメール',
      Password:'パスワード',
      ForgetPassword:'パスワードをお忘れですか?',
      DontAccount:`アカウントをお持ちでない場合は、`,
      Signup:'今すぐサインアップ',
    },
    forgotpassword:{
      ForgotPassword:"パスワードをお忘れですか",
      Pleaseregistered:'ご登録内容をご入力ください',
      emailaddress:'電子メールアドレス',
      Submit:'送信',
    },
    singup:{
      title:'サインアップ',
      OtherInfo:'他の情報',
      GeneralInfo:'一般的な情報',
      FirstName:'ファーストネーム',
      LastName:'苗字',
      Email:'Eメール',
      Password:'パスワード',
      ConfirmPassword:'パスワードを認証する',
      Next:'次',
      Alreadyaccount:'すでにアカウントをお持ちですか?',
      Login:'ログイン',
      ContactNumber:'連絡先番号',
      Address:'住所',
      City:'街',
      State:'州',
      InsuranceNumber:'保険番号',
      InsuranceProvider:'保険会社',
      Submit:'送信'
    },
    permission_text: {
      permission_decline: 'ユーザーがメッセージング権限を拒否しました:(',
      allow_text: 'さらに続行することを許可してください',
      not_allow: "許可しないでください",
      allow: '許可する',
      logout_text: 'ログアウトしてもよろしいですか?',
      yes_text: 'はい',
      no_text: 'いいえ',
      exit_txt: 'アプリケーションを終了してもよろしいですか?',
      location_denied:
        '位置情報へのアクセス要求が拒否されました。 ここをクリックして、設定から LOCATION 権限を有効にします。',
    },
    
  
    auth: {
      welcome: '究極のセキュリティへようこそ!',
      continue: '続行するにはサインインしてください',
      no_account: '新しいユーザーですか?',
      sign_up: 'サインアップ',
      sign_in: 'ログイン',
      keep_in: 'ログイン状態を保持する',
      enter_pass: ' パスワードを入力する',
      forget: 'パスワードを忘れましたか?',
      set_pass: '新しいパスワードを設定する',
      auth: '二要素認証 ',
      code_sent: '確認コードが送信されました',
      continue: '続く',
      cancel: 'キャンセル',
      reset: 'パスワードを再設定する',
      enterOtpTxt: 'OTPを入力してください',
      not_receive: 'コードを受け取っていませんか?',
      resend: 'コードを再送信する',
      already_acount: 'すでにアカウントをお持ちですか？',
      signUp_heading: 'アカウントを作成するための詳細を入力します。 ありがとう',
      personal_details: '個人情報',
      add_emergnecy: '緊急連絡先を追加',
      save: '保存して次へ',
      profile: 'プロファイルの作成',
      login: 'ログイン',
      enter_email: 'メールアドレスを入力して',
      register: '登録',
      signUp: 'サインアップ',
      enter_name: '名前を入力',
      enter_pass: 'パスワードを入力する',
      enter_currentPass: '現在のパスワードを入力してください',
      enter_newPass: '新しいパスワードを入力してください',
      enter_confirmPass: 'パスワードを認証する',
      enter_address: '住所を入力してください',
      enter_phone: '携帯電話番号を入力してください',
      enter_cnfrmPass: '確認用パスワードを入力してください',
      exitUser: '既存のユーザーですか?',
      forgetText:
        "メールアドレスを入力してください。パスワードをリセットする手順をお送りします。",
      otpText: 'メールで受け取った 6 桁の OTP を入力してください。',
      otp: 'ティッカー',
      enter_description: '説明を追加'
    },
    form: {
      phone: '電話番号',
      mobile: '携帯電話番号',
      pass: 'パスワード',
      newPass: '新しいパスワード',
      confirmPass: 'パスワードを認証する',
      email: 'Eメール',
      confirm: 'パスワードを認証する',
      fname: 'フルネーム',
      gender: '性別',
      dob: '生年月日',
      blood_grp: '血液型',
      martial: '配偶者の有無',
      m_name: 'ミドルネーム',
      l_name: '苗字',
      age: '年',
      address: '住所',
      neighbor: '近所',
      country: '国',
      Region: '領域',
      Province: '州',
      Department: 'デパートメント',
      City: '街',
      Village: '村',
      Pincode: 'ピンコード',
      name: '名前',
      relationship: '関係',
      currentPass: '現在のパスワード',
      newPass: '新しいパスワード',
      confirmPass: 'パスワードを認証する',
    },
    validation: {
      diff_pass:
        '新しいパスワードは、以前に使用したパスワードとは異なる必要があります。',
      enter_code: '4桁のコードを入力してください',
      invalid_email: '有効なメールアドレスを入力してください',
      invalid_mobile: '有効な携帯電話番号を入力してください', //needs to change this lang
      missing_email: 'メールが見つかりません',
      missing_mobileNo: '携帯電話番号がありません',
      missing_address: '住所がありません',
      missing_city: '市がありません',
      missing_state: '状態がありません',
      missing_insuranceNo: '保険番号がありません',
      missing_insuranceProvider: '保険会社が行方不明です',
  
      missing_firstName: '名がありません',
      missing_lastname: '姓がありません',
      invalid_otp: '無効なOTP',
      valid_password: '有効なパスワードを入力してください',
      missing_password: 'パスワードがありません',
      empty_fields: '続行するにはすべてのフィールドに入力してください。',
      missing_currentpassword: '現在のパスワードがありません',
      missing_newPassword: '新しいパスワードがありません',
      missing_confirmPassword: 'パスワードが欠落していることを確認する',
      match_Pass: '新しいパスワードと現在のパスワードが一致しません',
      uploadImage: '画像をアップロードしてください',
  
      allField: 'すべてのフィールドを追加してください',
      missing_sig: '署名を追加してください',
    
    },
    customAlert: {
      title: 'アラート',
      button: 'わかりました',
    },
    dashboard: {
      search: 'Search',
      dash_title: 'Home',
      mySites: 'My Sites',
      mySchedules: 'My Schedules',
      myVisit: 'My Visits',
      profile: 'Profile',
      name: 'Name: ',
      address: 'Address',
      contact: 'Contact',
      area: 'Site Area',
      editProfile: 'Edit Profile',
      updateprofile: 'Update Profile',
      scan: 'Qr Scan',
      notification: 'Notification',
      alarm: 'Alarm',
      adHoc: 'AD-HOC',
      task: 'My Task',
      training: 'Training',
      auditForm: 'Audit Form',
      dynamicForm: 'Dynamic Form',
      induction: 'Induction',
      document: 'Document',
      uploadFile: 'Upload Your File',
      pdfText: 'Upload PDF, DOC,JPEJ & EXCEL only',
      uploadText: 'Upload',
      cancel: 'Cancel',
      submit: 'Submit',
      uploadImageFrom: 'Upload Photo',
      camera: 'Camera',
      gallery: 'Gallery',
      signature: 'Signature',
      startVisit: 'Start Visit',
      endVisit: 'End Visit',
      location: 'Location',
      siteType: 'Site Type',
      uploadSignture: 'Upload Signature',
      expDate: 'Document Expiry Date * ',
      license: 'License',
      setting: 'Setting',
      editProfile: 'Edit Profile',
      changePass: 'Change Password',
      logout: 'Logout',
      logoutText: 'Do you want to logout?',
      no: 'No',
      yes: 'Yes',
      ChangePassword: 'ChangePassword',
      airport: 'Airport',
      checkout: 'Checkout',
      countinueWithScan: 'Continue With Scan',
      countinueWithoutScan: 'Continue Without Scan',
      uploadphoto: 'Upload Photo',
      enterText: 'Please Add some description why you selecting No',
      addPhoto: 'Add Photo',
      duration: 'Duration:',
      startTime: 'Start Time:',
      endTime: 'End Time:',
      siteStatus: 'Site Status:',
      trainigQuestions: 'Training Questions',
      inductionQuestions: 'Induction Questions',
      schedule: "Schedule List",
      siteName: 'Site Name',
      contactPerson: 'Contact Person',
      contactNum: 'Contact Number',
      serviceName: 'Service Name',
      siteInformation: 'Site Information',
      mySchedule: 'My Schedules',
      occurrence: 'Occurrence',
      scheduleName : 'Schedule Name: ',
      date: 'Date: '
  
    },
    server: {
      server_is_not_reachable:
        '現在サーバーにアクセスできません。ご迷惑をおかけして申し訳ありません。',
      error: 'エラー',
    },
    notification: {
      decline: '却下',
      accept: '受け入れる',
    },

    alert: {
      pass_reset:
        "パスワードは正常にリセットされました。 以下をクリックして魔法のようにサインインしてください。",
      alert_text: "アラート",
    },
    drawer: {
      Patient: "忍耐強い",
      Notifications: "通知",
      Setting: "設定",
      Language: "言語",
      ChangePassword: "パスワードを変更する",
      Logout: "ログアウト",
    },
    home: {
      UpcomingAppointment: "今後の予定",
      Within24Hr: "24時間以内",
      BookNowCard: "予定はありません",
      HospitalVisits: "病院への訪問",
      HealthChecks: "ヘルスチェック",
      Vaccinations: "予防接種",
      Documents: "書類",
      NoDataFound:'何もデータが見つかりませんでした',
      Vitals:'バイタル',
      Height:'高さ(センチ)',
      Weight:'重量(キログラム)',
      HeartRate:'心拍数',
    },
    appoiments: {
      title: "私の予定",
      UpcomingAppointment: "今後の予定",
      NoAppointment: "アクティブな予定はありません",
      Workflow: "ワークフロー",
      Xray: "X線               ",
      Sonography: "超音波検査               ",
      LipidProfile: "脂質プロファイル   ",
      BloodSugar: "血糖                              ",
      ApptNo: "応用いいえ。：",
      Status: "スターテス：",
    },
    documents: {
      title:'書類',
      NoDocuments: "利用可能な文書がありません",
      Share: "共有",
      SelectedDocuments: "選択したドキュメント",
      SearchDocument: "ドキュメントの検索",
    },
    visits: {
      Visits: "訪問",
      NoVisits: "訪問はできません",
    },
    profile: {
      title: "私のプロフィール",
      YourInsurancenumber: "あなたの保険番号",
      Allergies: "アレルギー",
      BMI: "ティッカー",
      Pulse: "脈",
      HeartRate: "心拍数",
      BP: "血圧",
      Tobacco: "タバコ",
      Alcohol: "アルコール",
      NotAvailable: "利用不可",
      BloodType:'血液型',
      AddType:'タイプの追加',
      Height:'身長',
      AddHeight:'高さを追加する',
      Weight:'重さ',
      AddWeight:'重量を追加する',
    },
    tabNavigater: {
      Home: "家",
      Appointments: "予約",
      Documents: "書類",
      Visits: "訪問",
      Profile: "プロフィール",
    },
    editProfile:{
      EditProfile:'プロファイル編集',
      GeneralInfo:'一般的な情報',
      OtherInfo:'他の情報',
      MedicalInfo:'医療情報',
      FirstName:'ファーストネーム',
      LastName:'苗字',
      ContactNumber:'連絡先番号',
      Email:'メール',
      Next:'次の',
      Address:'住所',
      City:'街',
      State:'州',
      InsuranceNumber:'保険番号',
      Back:'戻る',
      DOB:'生年月日',
      Gender:'性別',
      Male:'男',
      Female:'女性',
      Other:'他の',
      SelectBloodGroup:'血液型を選択してください',
      Select:'選択する',
      Allergies:'アレルギー',
      Height:'高さ(センチ)',
      Weight:'重量(キログラム)',
      Tobacco:'たばこ(1日あたり)',
      Alcohol:'アルコール類(1日あたり)',
      BMI:'ティッカー',
      Medication:'投薬',
      Submit:'送信'

    },
    model:{
      cancelappointment:'本当に予約をキャンセルしてもよろしいですか?',
      cancelmessage:'これにより予約がキャンセルされます。',
      CancelReason:'キャンセル理由',
      addreason:'理由を追加',
      Cancel:'キャンセル',
      Confirm:'確認',
      WaitingRoom:'待合室',
      Status:'スターテス:',
      cancel:'キャンセル',
      Reschedule:'スケジュールを変更する',
      CancelAppointments:'予約をキャンセルする',
      ScanQR:'QRをスキャン'
    },
    reschedule:{
      Reschedule:'スケジュールを変更する',
      AppointmentType:'予約の種類',
      Visit:'訪問',
      Vaccination:'ワクチン',
      BookingDate:'予約日を選択してください',
      Select:'選択する',
      BookingTime:'予約時間を選択してください',
      RescheduleAppointment:'予約の再スケジュール'
    }
  },
});
export default strings;