let danhSachSinhVien = new DanhSachSinhVien()
let validate = new Validation();
GetStorage();//sau delete 'k load page k bi mat
//bo sung thuoc tinh .//CUOI
SinhVien.prototype.DiemToan = '';
SinhVien.prototype.DiemLy = '';
SinhVien.prototype.DiemHoa = '';
SinhVien.prototype.DTB = '';
SinhVien.prototype.Loai = '';
//them phuong thuc
SinhVien.prototype.TinhDTB = function(){
    this.DTB = (Number(this.DiemToan) + Number(this.DiemLy) + Number(this.DiemHoa)) / 3;

}
SinhVien.prototype.XepLoai = function(){
    if(this.DTB <= 10 && this.DTB >= 8){
        this.Loai = "Xep loai gioi"
    }else if(this.DTB < 8 && this.DTB > 6.5){
        this.Loai = "Xep loai kha"
    }else if(this.DTB < 6.5 && this.DTB >= 5){
        this.Loai = "Xep loai tb"
    }else{
        this.Loai = "Xep loai yeu"
    }
}


function DomID(id){
    let element = document.getElementById(id);
    return element;
}

function ThemSinhVien(){
    //lay du lieu nguoi dung vao 
    //let masv= document.getelementbyid("masv").value
    let masv = DomID("masv").value;
    let hoten = DomID("hoten").value;
    let cmnd = DomID("cmnd").value;
    let sdt = DomID("sdt").value;
    let email = DomID("email").value;
    //kiem tra validation
    /*if (validation.KiemTraRong(masv) == true){
        DomID("masv").style.borderColor = "red";
    }
    else{
        DomID("masv").style.borderColor = "green";
    }
    */
    let loi = 0;
   if(KiemTraDauVaoRong("masv",masv) == true){
    loi++;//neu sai cong len 1 don vi
   }
   if(KiemTraDauVaoRong("hoten",hoten) == true){
    loi++;
   }
   if(KiemTraDauVaoRong("cmnd",cmnd) == true){
    loi++;
   }
   if(validate.KiemTraSoDT(sdt) == true){
    document.getElementById("sdt").style.borderColor = "green";
   }else{
    document.getElementById("sdt").style.borderColor = "red";
    loi++
   }

   if(validate.KiemTraEmail(email)){
        document.getElementById("email").style.borderColor = "green";
    }else{
        document.getElementById("email").style.borderColor = "red";
        loi++;
    }
   if(loi != 0){
    return; //#0 thi ket thuc
   }
   //them sv
   let sinhvien = new SinhVien(masv,hoten,email,sdt,cmnd);
   //doi tuong xet diem
   sinhvien.DiemToan = DomID("Toan").value
   sinhvien.DiemLy = DomID("Ly").value
   sinhvien.DiemHoa = DomID("Hoa").value
   sinhvien.TinhDTB();
   sinhvien.XepLoai();

   danhSachSinhVien.ThemSinhVien(sinhvien); //ben dssv.js push
   CapNhatDanhSachSV(danhSachSinhVien); //nhap dung or rong thi moi hien thi tren danh sach sinh vien
   console.log(danhSachSinhVien) //mang sv //capnhatdanhsachsinhvien

}

function KiemTraDauVaoRong(ID, value){
    if(validate.KiemTraRong(value) == true){
        DomID(ID).style.borderColor = "red";//rong
        return true;
    }
    else{
        DomID(ID).style.borderColor = "green"
        return false;
    }
}

function CapNhatDanhSachSV (DanhSachSinhVien){
    let lstTableSV = DomID("tbodySinhVien");//ben html 86
    lstTableSV.innerHTML = ""; //clear tr vao tao tr
    for(let i = 0; i < DanhSachSinhVien.DSSV.length; i++){
        //lay thong tin sinh vien tu ma sv
        let sv = danhSachSinhVien.DSSV[i]; //sv lay dnah sach trong mang DDSV
        //tao the tr
        let trSinhVien = document.createElement("tr");
        //doi mau mac dinh tr 149
        
        trSinhVien.id = sv.MaSV;
        trSinhVien.className = "trSinhVien";
        trSinhVien.setAttribute("onclick","ChinhSuaSinhVien('"+sv.MaSV+"')"); //su kien onclick="chinhsuasinhvien" them 2 nhay de thanh chuoi
        
        //tao cac the td vaf filter du lieu sc thu [i] vao
        let tdCheckBox = document.createElement("td");
        //xoa sv
        let ckbMaSinhVien = document.createElement("input");
        console.log(ckbMaSinhVien);
        ckbMaSinhVien.setAttribute("class","ckbMaSV")
        ckbMaSinhVien.setAttribute("type","checkbox");//delete sv
        ckbMaSinhVien.setAttribute("value",sv.MaSV);
        tdCheckBox.appendChild(ckbMaSinhVien) //add check box

        let tdMaSV = TaoTheTD("MaSV",sv.MaSV); //sv.Masv la sv chua trong mang DSSV
        let tdHoTen = TaoTheTD("HoTen",sv.HoTen);
        let tdCMND = TaoTheTD("CMND",sv.CMND);
        let tdEmail = TaoTheTD("Email",sv.Email);
        let tdSoDT = TaoTheTD("SoDT",sv.SoDT);
        //tao rg DTB va xep loai
        let tdDTB = TaoTheTD("DTB",sv.DTB);
        let tdXepLoai = TaoTheTD("XepLoai",sv.Loai)
        //append ca td vao tr
        trSinhVien.appendChild(tdCheckBox);
        trSinhVien.appendChild(tdMaSV);
        trSinhVien.appendChild(tdHoTen);
        trSinhVien.appendChild(tdCMND);
        trSinhVien.appendChild(tdEmail);
        trSinhVien.appendChild(tdSoDT);
        trSinhVien.appendChild(tdDTB);
        trSinhVien.appendChild(tdXepLoai);
        //append cac tr vaos tbodySinhVien
        lstTableSV.appendChild(trSinhVien);
    }
}
function TaoTheTD(className, value){ //MaSV, sv.MaSV
    let td = document.createElement("td");
    td.className = className;
    td.innerHTML = value;
    return td;

}

function SetStorage(){ //luu storge
    //chuyen doi object mang danh sach sinh vien thanh chuoi
    let jsonDanhSachSinhVien = JSON.stringify(danhSachSinhVien.DSSV);//Luu du lieu tren storage
    //roi dem chuoi json luu vao storge va dat ten la danhsachsv
    localStorage.setItem("DanhSachSV",jsonDanhSachSinhVien);

}
function GetStorage(){ //lay storge
    //lay chuoi json la mang danhsachsinhvien
    let jsonDanhSachSinhVien = localStorage.getItem("DanhSachSV");
    let mangDSSV = JSON.parse(jsonDanhSachSinhVien); //parse chuoi thanh mang
    danhSachSinhVien.DSSV = mangDSSV;
    CapNhatDanhSachSV(danhSachSinhVien);
}
//xoa sinh vien
function XoaSinhVien(){
    //mang check box
    let lstMaSV = document.getElementsByClassName("ckbMaSV"); //81
    //mang sv duoc chon
    let lstMaSVDuocChon = [];
    for(i = 0; i < lstMaSV.length; i++){ //kt phan tu checkbox co duoc chon chua?
        //console.log(lstMaSV[i]);
        if(lstMaSV[i].checked){
            lstMaSVDuocChon.push(lstMaSV[i].value);
        }
    }
    danhSachSinhVien.XoaSinhVien(lstMaSVDuocChon) //lstsvxoa = lstmasvduocchon
    CapNhatDanhSachSV(danhSachSinhVien);
}
function TimKiemSinhVien(){
    let tukhoa = DomID("tukhoa").value;
    let lstDanhSachSinhVienTimKiem = danhSachSinhVien.TimKiemSinhVien(tukhoa);
    CapNhatDanhSachSV(lstDanhSachSinhVienTimKiem);
}

function ChinhSuaSinhVien(masv){
    let sinhvien = danhSachSinhVien.TimSVTheoMa(masv);
    console.log(sinhvien)
    if(sinhvien != null){ //f12 check thu tu dom id
        DomID("masv").value = sinhvien.MaSV;
        DomID("hoten").value = sinhvien.HoTen;
        DomID("cmnd").value = sinhvien.CMND;
        DomID("email").value = sinhvien.Email;
        DomID("sdt").value = sinhvien.SoDT;

    }
}

function LuuThongTin()
{
    //Lấy dữ liệu từ người dùng nhập vào
    let masv = DomID("masv").value;
    let hoten = DomID("hoten").value;
    let cmnd = DomID("cmnd").value;
    let email = DomID("email").value;
    let sdt = DomID("sdt").value;
    let loi = 0;
    //Kiểm tra validation
    if(KiemTraDauVaoRong("masv",masv) == true)
    {
        loi++;
    }
    if(KiemTraDauVaoRong("hoten",hoten) == true)
    {
        loi++;
    }
    if(KiemTraDauVaoRong("cmnd",cmnd) == true)
    {
        loi++;
    }   
    if(validate.KiemTraEmail(email))
    {
        document.getElementById("email").style.borderColor = "green";
    }
    else
    {
        document.getElementById("email").style.borderColor = "red";
        loi++;
    }
    if(validate.KiemTraSoDT(sdt))
    {
        document.getElementById("sdt").style.borderColor = "green";
    }
    else
    {
        document.getElementById("sdt").style.borderColor = "red";
        loi++;
    }
    if(loi != 0)
    {
        return ;
    }
    //Thêm sinh viên
    let sinhvien = new SinhVien(masv,hoten,email,sdt,cmnd);
    danhSachSinhVien.SuaSinhVien(sinhvien);
    CapNhatDanhSachSV(danhSachSinhVien);
}