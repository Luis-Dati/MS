let mon10T1,tue10T1,wed10T1,thu10T1,fri10T1,sat10T1;
let scr2,scr3,scr4,scr5,scr6,scr7;

//nhập vi phạm từ máy vào tệp js
let ten, slg, dataApi;

const danhsach=[
	"Đi trễ sau tiếng trống thứ nhất",
	"Nghỉ học CP",
	"Không sinh hoạt chào cờ",
	"Không tham dự các buổi lễ, buổi triệu tập của nhà trường",
	"Không đeo phù hiệu",
	"Không đeo huy hiệu đoàn",
	"Không học bài, không làm bài tập",
	"Không mang dụng cụ học tập",
	"Nghỉ học KP",
	"Không đúng đồng phục",
	"Giày dép không đúng quy định",
	"Trang điểm",
	"Ồn ào, mất trật tự, không tập trung trong giờ học",
	"Nói chuyện riêng, làm việc riêng khi dự lễ",
   "Không có khăn trải bàn GV, khăn trải bàn dơ",
	"Không có bình bông bàn GV",
	"Sàn dơ",
	"Bảng dơ",
	"Bàn ghế dơ",
	"Xả rác",
	"Mang đồ ăn thức uống vào lớp",
	"Không nghiêm túc trong giờ kiểm tra, quay cóp",
	"Sử dụng điện thoại di động trong giờ học, kiểm tra",
	"Đánh nhau",
	"Bè nhóm gây mất đoàn kết",
	"Xúc phạm nhân phẩm người khác",
	"Nói tục, chửi thề",
];

switch (new Date().getDay()) {
case 0:
	dataApi="https://63d484c9c52305feff6476e6.mockapi.io/api/Monday";
	Handle(dataApi);
	break;
case 1:
	dataApi="https://63d484c9c52305feff6476e6.mockapi.io/api/Monday";
	Handle(dataApi);
	break;
case 2:
	dataApi="https://63d484c9c52305feff6476e6.mockapi.io/api/Tuesday";
	Handle(dataApi);	
	break;
case 3:
	dataApi="https://63d484c9c52305feff6476e6.mockapi.io/api/Wednesday";
	Handle(dataApi);
	break;
case 4:
	Thu5();
	break;
case 5:
	Thu2();
	Inkq();
	break;
case 6:
	Handle();
};


function Handle(dataApi) {
	function start() {
		getData(function(datas){
			render(datas);
			//datas này là 1 array, được lấy từ response
		});

		xulyCreate()
		//xử lí thao tác khi bấm nút create thì...
	}

	start();

	function getData(callback) {
		fetch(dataApi)
			.then(function(response){
				return response.json()
				//response lúc này là array, chứa dữ liệu của file json
			})
			.then(callback);
	}

	function createData(data, callback) {
		//data này là name và slg lấy từ input
		let option={
				method: 'POST',
				headers:{
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data)
		};
		
		fetch(dataApi,option)
			.then(function(response){
				return response.json();
			})
			.then(callback);
	}

	function render(datas) {
		let listDataBlock=document.querySelector('#list-data');

		//tạo thời gian
		const timeBlock=document.querySelector("#time");
		const time=new Date();
		const day=time.getDate();
		const month=time.getMonth()+1;
		const year=time.getFullYear();
		
		//in thời gian hiện tại
		let thgian=`\u25BA${day}/${month}/${year}`;
		timeBlock.innerHTML=thgian;

		//in ra data
		let htmls=datas.map(function(data){
			if (data.class==="10t1") {
				return `
					<div>
						<p>- ${data.name_vp}: ${data.quantity} học sinh</p>
					<div>
				`
			}
		});
		listDataBlock.innerHTML=htmls.join('');

		//tính điểm
		let subscore10t1=0;

		datas.forEach(function(vipham) {
			if (vipham.class==="10t1") {
				switch (vipham.name_vp) {
				case "Đi trễ sau tiếng trống thứ nhất":
				case "Nghỉ học CP":
				case "Không sinh hoạt chào cờ":
				case "Không tham dự các buổi lễ buổi triệu tập của nhà trường":
				case "Không đeo phù hiệu":
				case "Không đeo huy hiệu đoàn":
				case "Không học bài, không làm bài tập":
				case "Không mang dụng cụ học tập":
					subscore10t1=subscore10t1+10*vipham.quantity;
					break;
				case "Nghỉ học KP":
				case "Không đúng đồng phục":
				case "Giày dép không đúng quy định":
				case "Trang điểm":
				case "Ồn ào, mất trật tự, không tập trung trong giờ học":
				case "Nói chuyện riêng, làm việc riêng khi dự lễ":
				case "Không có khăn trải bàn GV, khăn trải bàn dơ":
				case "Không có bình bông bàn GV":
				case "Sàn dơ":
				case "Bảng dơ":
				case "Bàn ghế dơ":
				case "Xả rác":
				case "Mang đồ ăn thức uống vào lớp":
					subscore10t1=subscore10t1+20*vipham.quantity;
					break;
				case "Không nghiêm túc trong giờ kiểm tra, quay cóp":
				case "Sử dụng điện thoại di động trong giờ học, kiểm tra":
				case "Đánh nhau":
				case "Bè nhóm gây mất đoàn kết":
				case "Xúc phạm nhân phẩm người khác":
				case "Nói tục, chửi thề":
					subscore10t1=subscore10t1+50*vipham.quantity;
				}; 
			}
		});

		console.log(subscore10t1);
		//end function render
	}

	function xulyCreate(){
		let createBtn=document.querySelector('button');

		createBtn.onclick=function(){
			ten = document.getElementById('vipham').value;
			//kiểm tra nếu nhập đúng cách
			if (danhsach.includes(ten)===false) {
				alert("Bạn phải nhập vi phạm giống gợi ý đã cho");
				return;
			};

			slg = document.getElementById('sohsinh').value;
			//kiểm tra có đúng là số hay ko
			if (Number.isInteger(slg*1)===false) {
				alert("Bạn phải nhập 1 số");
				return;
			};

			let object = {
				name_vp:ten,
				quantity:slg,
				class:"10t1"
			};

			createData(object,function(){
				getData(function(data){
					render(data)
				});
			})
			//end function onclick
		}

		//end function xulyCreate	
	} 

	//end function Handle
};

function Inkq() {
	let total=500-subscore10t1;

	let score_block=document.querySelector('#score');
	score_block.innerHTML=total;
};