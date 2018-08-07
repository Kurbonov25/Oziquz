const Telegrambot = require ('node-telegram-bot-api')
const Telegram = require('telegram-node-bot')
var cloudinary = require('cloudinary')

const CLOUDINARY_URL=' https://api.cloudinary.com/v1_1/digitalm-uz/image/upload';
const CLOUDINARY_UPLOAD_PRESET='f9vqhfrg';
const TOKEN = process.env.TELEGRAM_TOKEN || '615615456:AAEfrAFvuFn0x4FMJemlbhwqPbdciUqFvpo';

const options={
   webHook: {
   port: process.env.PORT
  }
};
const url = process.env.APP_URL || 'https://oziquz.herokuapp.com:443';
const fs =require("fs")
const path=require("path")
const kb= require('./keyboard-button.js')
const keyboard = require('./keyboard.js')
const kb2= require('./keyboard-button2.js')
var mysql=require("mysql")
var link_to_chanel=`@oziquz`;
var limit=3;
var channel_id='@oziquz12';
var Originalchannel_id='@optimus1234q';
var Admin_id= 511599;
/////////////////////////////////////////////////////
//var category;
//var location;
//var phoneNumber;
//var user_id;
//var description;
//var status;
//var status_name;
//var language;
//var globalkey=0;
//var globalkey2=0;
//var globalkey3=0;
var globalkey4=0;
var max_counter=1;
var file_id;
var file_path;
//var username;
//var Category;
//var Location;
var ImageId_to_database;
var path_to_broadcast;
var path_to_broadcast_Image;
var adver;
var cap;
var news;
var key;
//var image;
var HashCat;
var HashLoc;

//////////////////////////html texts////////////////////////////////////////////////





////////////////////////////////////////////////////////////////////////////
var db =mysql.createConnection({
	host:"g9fej9rujq0yt0cd.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
	user:"mxz90fyzzvjtjjvq",
	password:"f5ofc6478zwp7vy5",
	database:"wv77yz38ipm4joli",
  charset : 'utf8mb4'
})
db.connect(function(err,res){
   if(!err)
   {
   	console.log("Successfully connected to Database");
   	
   }

})
cloudinary.config({
  cloud_name:'digitalm-uz',
  api_key: '512117594859833', 
  api_secret: 'I8UvzPJ6A_TIc1rcsPkdSqb3VBg'
})
console.log('Bot has been started ...')	

const bot = new Telegrambot(TOKEN, options);
bot.setWebHook(`${url}/bot${TOKEN}`);
	
     
/////////////////////////////bot.on//////////////////////////////////////////////////

bot.on('message',msg=>{
if (msg.text=="/start")
{
     db.query(`UPDATE temp SET flag=0 WHERE user_id=${msg.from.id}`)


      path_to_broadcast=0;
      user_id=msg.from.id;
}
if (path_to_broadcast_Image==1 && msg.text==undefined)
{  
   cap=`<b>📢 News || Новости || Yangilik </b>
   
  👉🏻 <b>`+adver+`</b>`;
  key=1;
  news=msg.photo[2].file_id;
  bot.sendPhoto(Admin_id,msg.photo[2].file_id,{
    caption:cap,
    parse_mode:"HTML",
    reply_markup:{
      keyboard:keyboard.broadcast2,
     resize_keyboard:true,
     one_time_keyboard:true,
     hide_keyboard:true
    }
  })
  path_to_broadcast_Image=0;
}




/////////////////////////////////////flag////////////////////////////////////////////////////
db.query(`SELECT * FROM temp WHERE user_id=${msg.chat.id}`,function(err,res)
{
  var flag=res[0].flag;
  var language=res[0].language;
  var status=res[0].status;
  var location=res[0].location;
  var phoneNumber=res[0].phone_number;
  var description=res[0].description;
  var status_name=res[0].status_name;

if (flag==1 && msg.text==undefined)
{
 
  var phoneNumber=msg.contact.phone_number;
  db.query(`UPDATE temp SET phone_number='${phoneNumber}' WHERE user_id=${msg.from.id}`)
  if (language == 'Uzbek')
  {
    var sent=phoneNumber + ` Телефон Рақами қабул қилинди ✅`;
    var html=`<b> Элон Матнини киритинг.Илтимос қисқа ва лўнда бўлсин.</b>
Масалан:

✏📄 <code> Шакар Сотаман. Улгуржи нархда. Россияда ишлаб чиқарилган. 1 қопда 50 кг. Минимал миқдор бир тўнна. Нархи 4500 сўм.</code>`;
var html2=`<b>Элон Матнини киритинг.Илтимос қисқа ва лўнда болсин.</b>
Masalan:

✏📄 <code>Kаптива Автомобилини Сотиб оламан. Йили 2017. Қора Ранг </code>`;
  }
   else if (language=='Russian')
  {
    var sent=`Принят ` +phoneNumber+ ` номер телефона ✅`;
    var html=`<b>Введите текст объявления.Пожалуйста как можно короче.</b>
Например:

✏📄<code> Продам Сахар. По оптовой цене. Коричневого цвета. Произведено в России. В упаковке 25 кг. Минимальный объем 1 тонна</code>`;
         var html2=`<b>Введите текст объявления. Пожалуйста как можно короче.</b>
Например:

✏📄 <code>Куплю автомобиль Каптива. 2017 год выпуска. Черный Цвет</code>`;
  }

  bot.sendMessage(msg.chat.id,sent).then(()=>{
    if (status==1 || status==2)
    {
      bot.sendMessage(msg.chat.id,html,{
      parse_mode:"HTML",
      reply_markup:{
        keyboard:keyboard.backfromDesc,
              resize_keyboard:true,
              one_time_keyboard:true
      }
    }).then(()=>{
         db.query(`UPDATE temp SET flag=2 WHERE user_id=${msg.from.id}`)
    })
     }
     else if(status==3 || status==4)
     {
           if (language=='Uzbek')
      {
        bot.sendMessage(msg.chat.id,html2,{
      parse_mode:"HTML",
      reply_markup:{
        keyboard:keyboard.backfromDesc,
              resize_keyboard:true,
              one_time_keyboard:true
      }
    }).then(()=>{
          db.query(`UPDATE temp SET flag=2 WHERE user_id=${msg.from.id}`)
    })
     }
     else if (language=='Russian')
     {
      bot.sendMessage(msg.chat.id,html2,{
      parse_mode:"HTML",
      reply_markup:{
        keyboard:keyboard.backfromDesc2,
              resize_keyboard:true,
              one_time_keyboard:true
      }
    }).then(()=>{
          db.query(`UPDATE temp SET flag=2 WHERE user_id=${msg.from.id}`)
    })
     }
     }
  })
  
  
}

  if (flag==1 && msg.text!=undefined && msg.text!='🏪 Бошига қайтиш' && msg.text!='🏪 Назад на главную' )
{
  if((/^[\+][9]{2}[8]{1}[1-9]{1}[0-9]{8}/.test(msg.text)))
  {

  var phoneNumber=msg.text;
  db.query(`UPDATE temp SET phone_number='${phoneNumber}' WHERE user_id=${msg.from.id}`)

    if (language == 'Uzbek')
  {
    var sent=phoneNumber+` Телефон Рақами қабул қилинди ✅`;
    var html=`<b>Элон Матнини киритинг.Илтимос қисқа ва лўнда.</b>
Масалан:

✏📄<code>Шакар Сотаман. Улгуржи нархда. Россияда ишлаб чиқарилган. 1 қопда 50 кг. Минимал миқдор бир тўнна. Нархи 4500 сўм.</code>`;
  }
   else if (language=='Russian')
  {
    var sent=`Принят ` +phoneNumber+ ` номер телефона ✅`;
    var html=`<b>Введите текст объявления.Пожалуйста как можно короче.</b>
Например:

✏📄 <code>Продам Сахар. По оптовой цене. Коричневого цвета. Произведено в России. В упаковке 25 кг. Минимальный объем 1 тонна </code>`;
  }

  
    bot.sendMessage(msg.chat.id,sent).then(()=>{
    bot.sendMessage(msg.chat.id,html,{
      parse_mode:"HTML",
      reply_markup:{
        keyboard:keyboard.backfromDesc,
              resize_keyboard:true,
              one_time_keyboard:true
      }
    }).then(()=>{

        db.query(`UPDATE temp SET flag=2 WHERE user_id=${msg.from.id}`)
    })
  })
  
    }
    else {
      if (language=='Uzbek')
      { 
       var text=`Сиз киритган <b>Телефон Рақамингиз</b> бизнинг стандартга тўгри келмади ❌ Илтимос қайтадан киритинг (мисол: +998901234567)`;
       var text2=`📲 Телеграмдаги Телефон Рақамингизни жонатиш`;
     var text3=`🏪 Бошига қайтиш`;
      }
      else if (language=='Russian')
      {
      var text=`Вы ввели <b>номер телефона</b> не соответствует нашим стандартам ❌ Пожалуйста, введите, используя этот шаблон (+998913274140)`;
        var text2=`📲 отправьте номер телефона в вашей телеграмме контакты`; 
      var text3=`🏪 Назад на главную`;
      } 
      bot.sendMessage(msg.chat.id,text,{
        parse_mode:"HTML",
             reply_markup:{
              keyboard:[[
             {
                text: text2,
                request_contact: true,

             },

            ],[text3]],
              resize_keyboard:true,
              one_time_keyboard:true
             }
      });

      
    }
}
//////////////////////////////////global key2/////////////////////////////////////////
if (flag==2 && msg.text!='🏪 Бошига қайтиш' && msg.text!='🏪 Назад на главную')
{
  

  
  var check=0;
  var description=msg.text;
  

  for (var count=0;description.length>count;count++)
  {
  
    if (description[count]==';'|| description[count]==`"` || description[count]==`'` || description[count]==`/` ||description[count]==`%`)
    {
      check=1;

    }
  }
  if (check==1)
  { 
    if (language=='Uzbek')
    {
       var attention=`<b>Сиз киритган еълон матни бизнинг стандартга тўгри келмади ❌ Илтимос еълон матнида (; " ' / % ) белгилардан фойдаланманг 🙅</b>`;
       bot.sendMessage(msg.chat.id,attention,{
        parse_mode:"HTML"
       })
    }
    else if (language=='Russian')
    {
 var attention=`<b>введенный вами текст не соответствует наш стандарт ❌ Пожалуйста, не используйте 🙅 ети символы (; " ' / %) </b>`;
       bot.sendMessage(msg.chat.id,attention,{
        parse_mode:"HTML"
       })
    }
  
  }
  else if (check==0)
  {

    db.query(`UPDATE temp SET description='${description}' WHERE user_id=${msg.from.id}`)

    if (language=='Uzbek')
  {
     var pict=`Элонга таллуқли расм жойланг! 
     👉Расм юклаш учун 📎белгисини босинг. 👉 Эсингизда бўлсин еълон расм билан яхшироқ кўринади ва харидорлар етиборини тортади. 
     ❗️Расм ёқ бўлса "<b>Давом еттириш</b>" тугмасини босиб ушбу қадамни ўтказиб юборинг.`;
bot.sendMessage(msg.chat.id,pict,{
    parse_mode:"HTML",
    reply_markup:{
      keyboard:keyboard.desc,
      resize_keyboard:true,
      one_time_keyboard:true
    }
   }).then(()=>{
   db.query(`UPDATE temp SET flag=3 WHERE user_id=${msg.from.id}`)
   }) 
   }
   else if (language=='Russian')
   {
     var pict=`Загрузите 1 фотографию для этого объявления!
👉Щелкните значок📎 изображения для загрузки.
👉Имейте в виду, что объявления с изображением выглядит лучше и привлекает внимание клиента.
❗️Если нет фото, пропустите этот шаг, нажав кнопку <b>«Продолжить»</b>.`;
bot.sendMessage(msg.chat.id,pict,{
    parse_mode:"HTML",
    reply_markup:{
      keyboard:keyboard.desc2,
      resize_keyboard:true,
      one_time_keyboard:true
    }
   }).then(()=>{
     db.query(`UPDATE temp SET flag=3 WHERE user_id=${msg.from.id}`)
   }) 
   }
  }
  
   
   
   
  
}
///////////////////////////////////////////global key 3////////////////////////////////////////////////////
if (flag==3 && msg.text==undefined)
{
  
 db.query(`UPDATE temp SET flag=4 WHERE user_id=${msg.from.id}`)
  

   
  globalkey4=1;

   
     file_id=msg.photo[2].file_id;
    var dir = './photos/';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

  var file_info =bot.getFile(file_id).then(function(resp)
    {
             file_path=resp.file_path;
             bot.downloadFile(file_id,'./photos/').then(function(path)
             {
               
               cloudinary.uploader.upload(path, function(result) { 
              var image=result.url;
               db.query(`UPDATE temp SET image='${image}' WHERE user_id=${msg.chat.id}`) 
                Caption=`👉🏻 `+description+`

☎️  Маълумот учун: `+phoneNumber+`

⭐️ #`+status_name+` #`+HashCat+` #`+HashLoc+`

📲 Каналга обуна учун 👉 @oziquz 👈 `+`
<a href="`+result.url+`">&#160 </a>`;

  
    bot.sendMessage(msg.chat.id,Caption,{
     parse_mode:"HTML"
    }).then(()=>{
      if (language=='Uzbek')
      {
          var text='❗ Агар еълон кўриниши ва Барча малумотлар тўгри бўлса еълон бериш клавишини босинг акс ҳолда бошига қайтинг'; 
        bot.sendMessage(msg.chat.id,text,{
        reply_markup:{
          keyboard:keyboard.final,
          resize_keyboard:true,
              one_time_keyboard:true
        }
      })
      }
      else if(language=='Russian')
      {
           var text='❗ Если просматривать объявления и вся информация верны , нажмите на кнопку \"объявление\", в противном случае вернуться в Главное меню и заполнить все снова';
         bot.sendMessage(msg.chat.id,text,{
        reply_markup:{
          keyboard:keyboard.final2,
          resize_keyboard:true,
              one_time_keyboard:true
        }
      })
      }
      
    })
}); 
             });
        

    });
      

     
    
    
   
    
  
  
  
  


}
})



if(path_to_broadcast==1 && msg.text!=undefined && msg.text!='🏪 Бошига қайтиш' )
{ 
  path_to_broadcast=0;
   adver=msg.text;
 bot.sendMessage( Admin_id,"Расм Қўшмоқчимисиз ?",{
  reply_markup:{
     keyboard:keyboard.broadcast,
     resize_keyboard:true,
     one_time_keyboard:true
  }
 }) 
 path_to_broadcast_Image=1;

}
if (path_to_broadcast==1 && msg.text==undefined )
{
  bot.sendMessage(Admin_id,"Фақат string да хабар ёзинг");
}
else
{
	switch(msg.text)
	{
		case kb.GoHome.goHome:
		case kb2.GoHome.goHome:
		case kb.Choice.back:
		case  kb2.Choice.back:
		{
     
			
			
      path_to_broadcast=0;
		
   
		    const Html=
 `🇺🇿 <b>Тилни Танланг</b>  🇷🇺 <b>Выберите язык</b>`;

  bot.sendMessage(msg.chat.id,Html,{
  	parse_mode:"HTML",
  	reply_markup:{
  		keyboard:keyboard.home,
  		resize_keyboard:true,
  		one_time_keyboard:true
  	}
  })	
			break;
        }
        case kb.BackfromCat.goBack:
        {
            const text=`Сиз <b>Товар Сотмоқчимисиз ?</b> ёки <b>Сотиб Олмоқчимисиз ?</b>  `	
         bot.sendMessage(msg.chat.id,text,{
         	parse_mode:"HTML",
         	reply_markup:{
         		keyboard:keyboard.choice,
         		resize_keyboard:true,
         		one_time_keyboard:true
         	}
         });
        	break;
        }
		case kb.Home.Uzbek:
		{
      var user_id=msg.from.id;
			var language='Uzbek';
      db.query(`UPDATE temp SET language='Uzbek' WHERE user_id=${user_id}`)

const text=`Сиз <b>Товар Сотмоқчимисиз ?</b> ёки <b>Сотиб Олмоқчимисиз ?</b>  `	
         bot.sendMessage(msg.chat.id,text,{
         	parse_mode:"HTML",
         	reply_markup:{
         		keyboard:keyboard.choice,
         		resize_keyboard:true,
         		one_time_keyboard:true
         	}
         });
         break;
		}

		case kb.Choice.sell:
		case kb2.Choice.sell:
		{   
			
		    var language;
        var user_id=msg.from.id;
		        	
		       /* 	db.query(`SELECT * FROM sotish WHERE user_id=${user_id} `,function(err,res){
				    
						let promises=res.map((f,i)=>{max_counter=i+1;});
						Promise.all(promises).then(function(values)
						{ 
					
                          if (max_counter<limit || res[0]==undefined || 1==1) /////////////Check
			
			{	*/

			
        db.query(`SELECT language FROM temp WHERE user_id=${user_id}`,function(err,res)
        { 
         
          language=res[0].language;
          if (language=="Uzbek"){
            db.query(`UPDATE temp SET status=1, status_name='Сотамиз'  WHERE user_id=${msg.from.id}`)
          }
        else if (language=="Russian"){
          db.query(`UPDATE temp SET status=2, status_name='Продаем'  WHERE user_id=${msg.from.id}`)
        }
        
        
      if (language=='Uzbek')
            {
           
            var text=`Қайси турдаги Маҳсулотни сотмоқчисиз:`;
            var text2=`Орқага қайтиш учун ушбу 🏪 ⬅ тугмаларни босинг`;
            var keyboardCat=keyboard.backfromCat;
            }
            else if (language=='Russian')
            {
         
            var text=`Выберите категорию продукта которую хотите продать:`;
            var text2=`Чтобы вернуться нажмите на кнопки 🏪 ⬅`;
            var keyboardCat=keyboard.backfromCat2;
            } 

           
            var array1=[];
            var array2=[];
            var counter1=0;
            var counter2=0;
            var count=0;
           
            db.query(`SELECT * FROM categories WHERE language='${language}'`,function(err,res){
            
               let promises= res.map((f,i)=>{

                    count++;
                    if((i+1)%2==1)
                    {   
                          array1[counter1]=f.category;     
                          counter1++;

                    }
                    else 
                    {
                       
                        array2[counter2]=f.category;  
                        counter2++;
                        
                    }
                   
                });
            Promise.all(promises).then(function(values)
            {
              
             
              bot.sendMessage(msg.chat.id,text,{
              reply_markup:{
                
                 
                 inline_keyboard: array2.map((x, xi) => (
                  [
                  {
                  text:  array1[xi],
                  callback_data:array1[xi]
                 },
                     {
                      
                      text: array2[xi],
                      callback_data:array2[xi]
                        
                     }

                  ]
                  )),
                resize_keyboard:true,
                  one_time_keyboard:true          
            }
              
            }).then(()=>{
             
              bot.sendMessage(msg.chat.id,text2,{
                reply_markup:{
                  keyboard:keyboardCat,
                      resize_keyboard:true,
                      one_time_keyboard:true,
                     
                }
              })
              
            
            })
          
          
            });
          
          
         });
         
         // }  
      
  /*    else if (max_counter>2)
        {
          if (language=='Uzbek')
          {
                     var text=`<b>Сизда еълон бериш лимити тугади!
Агар сиз кўпроқ еълон бермоқчи бўлсангиз пуллик хизматдан фойдаланинг. 💰 1 та еълон бериш учун PayMe ёки CLICK орқали қуйидаги карта 8600 3029 2503 5154 га 30.000 (ўттиз минг сўм) ўтказиб бизга yozing. Тўлиқ малумот учун бизга @ёзинг</b>`;
          }
          else if(language=='Russian')
          {
                     var text=`<b>У Вас закончился лимит на публикацию объявления!
Если хотите разместить больше объявления, воспользуйтесь платными услугами.

💰 Что бы приобрести пакет из 1 объявление, отправьте через Payme или CLICK 30 000 сум на карту 8600 3029 2503 5154

Для подробной информации свяжитесь с нами @yozing</b>`;
          } 
          bot.sendMessage(msg.chat.id,text,{
            parse_mode:"HTML"
          });
        }*/
            
        //  });
        //  });


        
          
         
        
      

        })
        
			break;
		}
		case kb.Final.approve:
		case kb2.Final.approve:
		{ 
     
     var forward_id=msg.message_id;

     db.query(`SELECT * FROM temp WHERE user_id=${msg.chat.id}`,function(err,res)
{
  var flag=res[0].flag;
  var language=res[0].language;
  var status=res[0].status;
  var location=res[0].location;
  var phoneNumber=res[0].phone_number;
  var description=res[0].description;
  var status_name=res[0].status_name; 
  var image =res[0].image;
  var category=res[0].category;
  var user_id=res[0].user_id;
  var username=msg.from.username;
  console.log(msg);

  if (flag==5)
      {
       
        /*var Caption=`⭐ #`+status_name+` | #`+category[0]+` |🌎 #`+location[0]+`

📜<b>`+description+`</b>

`+link_to_chanel+`<a href="http://idum.uz/wp-content/uploads/2016/08/diqqat_vnimaniye.jpg">&#160</a>`; 
 */
      var Caption=`👉🏻 `+description+`

☎️  Маълумот учун: `+phoneNumber+`

⭐️ #`+status_name+` #`+HashCat+` #`+HashLoc+`

📲 Каналга обуна учун 👉 @oziquz 👈`;
      var result=bot.sendMessage(channel_id,Caption,{
             parse_mode:"HTML",
             caption:Caption,
             reply_markup:{
              inline_keyboard:[
                    [
                        {
                           text:"Post",
                           callback_data:'post'
                        }
                    ],
                    [
                        {
                          text:'Delete',
                          callback_data:'delete'
                        }

                    ]
                   
              ]
             }
          }).then(function(resp)
          {
           bot.forwardMessage(channel_id,msg.chat.id,forward_id);
           ImageId_to_database=resp.message_id;
           
          }).then(()=>{
          

            db.query(`INSERT INTO sotish (user_id,category,location,phone_number,description,status,username,image_id,hashCat,hashLoc) VALUES (${user_id},'${category}','${location}','${phoneNumber}','${description}',${status},'${username}',${ImageId_to_database},'${HashCat}','${HashLoc}')`);
          }) 
      
      }
      else if (flag==4)
        {
           

       /*    var Caption=`⭐ #`+status_name+` | #`+category[0]+` |🌎 #`+location[0]+`

📜<b>`+description+`</b>

`+link_to_chanel+`<a href="https://api.telegram.org/file/bot636989293:AAEqf-WIQYcrDwnkr71viqrM_w6thWpY3T0/`+file_path+`">&#160</a>`; 
    */    
   globalkey4=0;
 
  Caption=`👉🏻 `+description+`

☎️  Маълумот учун: `+phoneNumber+`

⭐️ #`+status_name+` #`+HashCat+` #`+HashLoc+`

📲 Каналга обуна учун 👉 @oziquz 👈 `+`
<a href="`+image+`">&#160 </a>`;    
          
        
            
            

            var result = bot.sendMessage(channel_id,Caption,{
              parse_mode:"HTML",
              reply_markup:{
              inline_keyboard:[
                    [
                        {
                           text:"Post",
                           callback_data:'post'
                        }
                    ],
                    [
                        {
                          text:'Delete',
                          callback_data:'delete'
                        }

                    ]
              ]
             }
          }).then(function(resp)
          {
            bot.forwardMessage(channel_id,msg.chat.id,forward_id);
           ImageId_to_database=resp.message_id;
           
          }).then(()=>{
        
            db.query(`INSERT INTO sotish (user_id,category,location,phone_number,description,status,picture_path,username,image_id,hashCat,hashLoc) VALUES (${user_id},'${Category}','${Location}','${phoneNumber}','${description}',${status},'${image}','${username}',${ImageId_to_database},'${HashCat}','${HashLoc}')`);
          }) 
            

          
    
    
        } 
        if (language=='Uzbek')
        {
                   var text=`Сизнинг еълонингиз қабул қилинди . ✅ Модератор текширувидан сўнг @oziquz каналида чоп етилади`;
           bot.sendMessage(msg.chat.id,text,{
          reply_markup:{
                  keyboard:keyboard.backfromDesc,
                  resize_keyboard:true,
                one_time_keyboard:true,
    
          }
      })
        }
        else if (language=='Russian')
        {
                   var text=`Вашему озвучить принято ✅. После проверки руководителем, ваш сообщить, будут размещены на канал @oziquz`;
           bot.sendMessage(msg.chat.id,text,{
          reply_markup:{
                  keyboard:keyboard.backfromDesc2,
                  resize_keyboard:true,
                one_time_keyboard:true,
               
          }
      })
        }
          

})
     
				
			
			
			break;
		}
    case kb.Choice.help:
    case kb2.Choice.help:
    { 
      db.query(`SELECT language FROM temp WHERE user_id=${msg.chat.id}`,function(err,res)
      {
        var language=res[0].language;
        
        var text6;
        var text7;
      if (language=='Uzbek'){ text6=`Агар админга саволингиз ёки фикрларингиз бўлса ушбу \"Уланиш\" кнопкани босинг 👇👇👇`; text7=`Уланиш`;}
      if (language=='Russian'){text6=`Если у вас есть вопрос или предложение, Вы можете связаться с администратором, нажав на эту кнопку ниже 👇👇👇`;text7=`Cоединять`}  
      bot.sendMessage(msg.chat.id,text6,{
        parse_mode:"HTML",
        reply_markup:{
          inline_keyboard:[
                    [
                        {
                           text:text7,
                          url:"https://t.me/joylash"
                        }
                    ],
                    
                   
              ]
        }
      })
      })
      
      break;
    }
		case kb.Desc.continue:
		case kb2.Desc.continue:
		{
		
		db.query(`SELECT * FROM temp WHERE user_id=${msg.chat.id}`,function(err,res)
{
  var flag=res[0].flag;
  var language=res[0].language;
  var status=res[0].status;
  var location=res[0].location;
  var phoneNumber=res[0].phone_number;
  var description=res[0].description;
  var status_name=res[0].status_name;
 db.query(`UPDATE temp SET flag=5 WHERE user_id=${msg.from.id}`)
  var Caption=`👉🏻 `+description+`

☎️  Маълумот учун: `+phoneNumber+`

⭐️ #`+status_name+` #`+HashCat+` #`+HashLoc+`

📲 Каналга обуна учун 👉 @oziquz 👈 `;

   
    bot.sendMessage(msg.chat.id,Caption,{
     parse_mode:"HTML"
    }).then(()=>{
      if (language=='Uzbek')
      {
          var text='❗ Агар еълон кўриниши ва Барча маълумотлар тўғри бўлса еълон бериш клавишини босинг акс ҳолда бошига қайтинг.'; 
        bot.sendMessage(msg.chat.id,text,{
        reply_markup:{
          keyboard:keyboard.final,
          resize_keyboard:true,
              one_time_keyboard:true
        }
      })
      }
      else if(language=='Russian')
      {
           var text='❗ Если проверили ваще объявление и вся информация верна, нажмите на кнопку \"объявление\", в противном случае вернуться в Главное меню и заполните все снова';
         bot.sendMessage(msg.chat.id,text,{
        reply_markup:{
          keyboard:keyboard.final2,
          resize_keyboard:true,
              one_time_keyboard:true
        }
      })
      }
      
    })

})
         
         
	  
    


			break;
		}
		case kb.Choice.buy:
		case kb2.Choice.buy:
		{
			
				
			
      /*	db.query(`SELECT * FROM sotish WHERE user_id=${user_id} `,function(err,res){
				    
					let promises=res.map((f,i)=>{max_counter=i+1;});
						Promise.all(promises).then(function(values)
						{ 
							
                          if (max_counter<limit || res[0]==undefined || 1==1)
              {*/

			
      if (language=="Uzbek"){status=3;status_name=`СотибОламиз`;}
			else if (language=="Russian"){status=4;status_name=`Покупаем`;}
			if (language=='Uzbek')
            {
           
            var text=`Қайси турдаги Маҳсулот сотиб олмоқчисиз:`;
            var text2=`Орқага қайтиш учун ушбу 🏪 ⬅ тугмаларни босинг`;
            var keyboardCat=keyboard.backfromCat;
            }
            else if (language=='Russian')
            {
            
            var text=`Выберите категорию продукта которую хотите купить:`;
            var text2=`Чтобы вернуться нажмите на кнопки 🏪 ⬅`;
            var keyboardCat=keyboard.backfromCat2;
            } 

           
            var array1=[];
            var array2=[];
            var counter1=0;
            var counter2=0;

            db.query(`SELECT * FROM categories WHERE language='${language}'`,function(err,res){
               let promises= res.map((f,i)=>{
                    if((i+1)%2==1)
                    {   
                          array1[counter1]=f.category;     
                         counter1++;

                    }
                    else 
                    {
                       
                        array2[counter2]=f.category;  
                        counter2++;
                        
                    }
                   
                });
            Promise.all(promises).then(function(values)
            {
             bot.sendMessage(msg.chat.id,text,{
              reply_markup:{
                
                 
                 inline_keyboard: array2.map((x, xi) => (
                  [
                  {
                  text:  array1[xi],
                  callback_data:array1[xi]
                 },
                     {
                      
                      text: array2[xi],
                      callback_data:array2[xi]
                        
                     }

                  ]
                  )),
                resize_keyboard:true,
                  one_time_keyboard:true          
            }
              
            }).then(()=>{
             
              bot.sendMessage(msg.chat.id,text2,{
                reply_markup:{
                  keyboard:keyboardCat,
                      resize_keyboard:true,
                      one_time_keyboard:true,
                    
                }
              })
              
            
            })
            });
         });
         
           



//}







          
		
	
 /*else
				{
					if (language=='Uzbek')
					{
                     var text=`<b>Сизда еълон бериш лимити тугади!
Агар сиз кўпроқ еълон бермоқчи бўлсангиз пуллик хизматдан фойдаланинг.

💰 1 та еълон бериш учун PayMe ёки CLICK орқали қуйидаги карта 8600 3029 2503 5154 га 30.000 (ўттиз минг сўм) ўтказиб бизга ёзинг. Тўлиқ малумот учун бизга @yozing.</b>`;
					}
					else if(language=='Russian')
					{
                     var text=`<b>У Вас закончился лимит на публикацию объявления!
Если хотите разместить больше объявления, воспользуйтесь платными услугами.

💰 Что бы приобрести пакет из 1 объявление, отправьте через Payme или CLICK 30 000 сум на карту 8600 3029 2503 5154

Для подробной информации свяжитесь с нами @yozing</b>`;
					}	
					bot.sendMessage(msg.chat.id,text,{
						parse_mode:"HTML"
					});
				}
                        
                          	});
				

				});
			 	
	*/
		
           
			break;
		}
		case kb.Home.Russian:
		case kb2.BackfromCat.goBack:
		{
			language='Russian';
const text=`Вы собираетесь <b> Продавать  </b>или  <b>купить </b> продукты?  `	
         bot.sendMessage(msg.chat.id,text,{
         	parse_mode:"HTML",
         	reply_markup:{
         		keyboard:keyboard.choice2,
         		resize_keyboard:true,
         		one_time_keyboard:true
         	}
         });
          break;
		}
    case kb.Broadcast2.declare:
    {
      db.query(`SELECT DISTINCT user_id FROM sotish`,function(err,res)
      {
      
        res.map((f,i)=>{
          if (key==1)
           {
            bot.sendPhoto(f.user_id,news,{
            caption:cap,
            parse_mode:"HTML",
            reply_markup:{
            keyboard:keyboard.goBroadcast,
            resize_keyboard:true,
            one_time_keyboard:true,

          }
         }).catch(function(error){
               if (error.response && error.response.statusCode === 403)
               {
               
               }
            });
          }
          else if (key==2)
          { 
            
            bot.sendMessage(f.user_id,cap,{
             parse_mode:"HTML",
            reply_markup:{
            keyboard:keyboard.goBroadcast,
            resize_keyboard:true,
            one_time_keyboard:true,

          }
            }).catch(function(error){
               if (error.response && error.response.statusCode === 403)
               {
            
               }
            });
          }
        })
        
      
      
      })
      break;
    }
    case kb.GoBroadcast.goBroadcast:
    {
      user_id=msg.from.id;
    if (user_id==Admin_id)
      {
        path_to_broadcast=1;
        const Html=
 ` <b>Янгилик ёки Хабарни Киритинг</b>`;

  bot.sendMessage( Admin_id,Html,{
    parse_mode:"HTML",
     reply_markup:{
      keyboard:keyboard.backfromDesc,
      resize_keyboard:true,
      one_time_keyboard:true
    }
    })
}

      break;
    }
    case kb.Broadcast.skip:
    { 
       key=2;
      cap=`<b>📢 News || Новости || Yangilik </b>
   
👉🏻 <b>`+adver+`</b>`;

     bot.sendMessage(Admin_id,cap,{
      parse_mode:"HTML",
      reply_markup:{
      keyboard:keyboard.broadcast2,
     resize_keyboard:true,
     one_time_keyboard:true,
     hide_keyboard:true
    }
     })
     path_to_broadcast_Image=0;
     break;
    }
   case kb.Broadcast2.Cancel:
   {
  
    var alert=` <b> Сизнинг broadcast янгиликингиз бекор қилинди ❌ орқага қайтиш учун "🚄 Бошига қайтиш" тугмасини босинг  ёки  "/start" 
командаси ёзиш орқали асосий менюга га ўтишингиз мумкин </b>`;
    bot.sendMessage(Admin_id,alert,{
      parse_mode:"HTML",
      reply_markup:{
        keyboard:keyboard.goBroadcast,
        resize_keyboard:true,
        one_time_keyboard:true,
        hide_keyboard:true
      }
    })
    break;
   }
		}
		}
       

})

//////////////////////////////bot.onText/////////////////////////////////////////////
bot.onText(/\/start/,msg=>{



 var count=0;
 user_id=msg.from.id;


 db.query(`SELECT user_id FROM temp WHERE user_id=${user_id}`,function(err,res)
 {
    let promises=res.map((f,i)=>{
      count++;
    })
  Promise.all(promises).then(function(values){
    if (count>0)
    {
      db.query(`DELETE FROM temp WHERE user_id=${user_id}`)
      db.query(`INSERT INTO temp (user_id) VALUES (${user_id})`) 
    }
    else if(count==0)
    {
      db.query(`INSERT INTO temp (user_id) VALUES (${user_id})`)
    }
  })
 })
 



 username=msg.from.username;
 path_to_broadcast=0;
 status=0;
 

 globalkey3=0;
 globalkey4=0;
 const Html=
 `🇺🇿 <b>Тилни Танланг 
</b>🇷🇺 <b>Выберите язык</b>`;

  bot.sendMessage(msg.chat.id,Html,{
  	parse_mode:"HTML",
  	reply_markup:{
  		keyboard:keyboard.home,
  		resize_keyboard:true,
  		one_time_keyboard:true
  	}
  })

})
bot.onText(/\/broadcast/,msg=>{


 user_id=msg.from.id;
 if (user_id==Admin_id)
 {
  path_to_broadcast=1;
 const Html=
 ` <b>Янгилик ёки Хабарни Киритинг</b>`;

  bot.sendMessage( Admin_id,Html,{
    parse_mode:"HTML",
    reply_markup:{
      keyboard:keyboard.backfromDesc,
      resize_keyboard:true,
      one_time_keyboard:true
    }
    })
}
})
//////////////////////////////////bot.on (callback)/////////////////////////////////////////
bot.on("callback_query",function(query){
	var data=query.data;
	var chatID=query.message.chat.id;
	var message_id=query.message.message_id;
  
  if (data=='post')
  {
    var description1;
    var phoneNumber1;
    var status_name1;
    var category1;
    var location1;
    var link;
 /* 
  var images={
    jpg: './photos/file_27.jpg'
  };

 
var htm=`<a href="`+images`"> 123</a>`;
bot.sendMessage(Originalchannel_id,htm,{
  parse_mode:"HTML"
});
 */
  //bot.forwardMessage(Originalchannel_id,chatID,message_id);
  db.query(`SELECT * FROM sotish WHERE image_id=${message_id} ORDER BY id DESC LIMIT 1;`,function(err,res)
  {
       let promises=res.map((f,i)=>{
       description1=f.description;
       phoneNumber1=f.phone_number;
       category1=f.category;
       location1=f.location;
       link=f.picture_path;
       hash1=f.hashCat;
       hash2=f.hashLoc;
       var text7=`<b>Сизнинг эълонингиз</b> 👉🏻  @oziquz <b>каналида чоп этилди.</b>
<b>Ваше объявление было опубликовано на канале</b> 👉🏻 @oziquz.                   `
       bot.sendMessage(f.user_id,text7,{
        parse_mode:"HTML"
       })
      
       
    
       if (f.status==1)
       {
        status_name1='Сотамиз';
        
       }
       else if (f.status==2)
       {
        status_name="Продаем";
       }
       else if (f.status==3)
       {
        status_name1="Сотиболамиз";
       }
        else if (f.status==4)
       {
        status_name1="Покупаем";
       }
    

    });
    
     Promise.all(promises).then(function(values){

    Caption=`👉🏻 `+description+`

☎️  Маълумот учун: `+phoneNumber+`

⭐️ #`+status_name+` #`+hash1+` #`+hash2+`

📲 Каналга обуна учун 👉 @oziquz 👈 `+`
<a href="`+link+`">&#160 </a>`;
   bot.sendMessage(Originalchannel_id,Caption,{
    parse_mode:"HTML"
   });

     })

    
  })

  var update=`UPDATE sotish SET position = 'Posted' WHERE image_id=${message_id}`;
  bot.deleteMessage(chatID,message_id);
   db.query(update);
  
  }
  else if(data=='delete')
  {
 
  bot.deleteMessage(chatID,message_id);
  var update=`UPDATE sotish SET position = 'Deleted' WHERE image_id=${message_id}`;
  db.query(update);
  }

 
  db.query(`SELECT * FROM categories WHERE category='${data}'`,function(err,res){
    
    var counter=0; 
    res.map((f,i)=>{
         counter++;
         HashCat=f.hash;
    })
     if (counter>=1)
     {
       var category=data;
       var user_id=query.message.chat.id;
   
     db.query(`UPDATE temp SET category='${category}' WHERE user_id=${user_id}`);
      var array1=[];
       var array2=[];
       var counter1=0;
       var counter2=0;
     db.query(`SELECT language FROM temp WHERE user_id=${user_id}`,function(err,res)
        { 
          chatID=query.message.chat.id;
         var language=res[0].language;
            db.query(`SELECT location FROM locations WHERE language='${language}'`,function(err,res){
               
               let promises= res.map((f,i)=>{
                    if((i+1)%2==1)
                    {   
                          array1[counter1]=f.location;   
                         counter1++;

                    }
                    else 
                    {
                       
                        array2[counter2]=f.location;
                        counter2++;
                        
                    }
                   
                });

                Promise.all(promises).then(function(values)
            {
                  
                    var language="Uzbek"; 
                             if (language == 'Uzbek')    
                  {
                      var html=`Шаҳарни танланг`;
                      var text=`Сиз <b>${data}</b> бўлимини танладингиз`;
                  }
                  else if (language=='Russian')
                  {
                     var html=`Выберите город`; 
                     var text=`Вы выбрали раздел <b>${data}</b> `;
                  }
               
                bot.editMessageText(text,{
                chat_id:chatID,
                message_id:message_id,
                parse_mode:"HTML"

               }).then(()=>{
              bot.sendMessage(chatID,html,{
               reply_markup:{
                             inline_keyboard: 
                 
                 array2.map((x, xi) => ([
                 
                 {
                  text:  array1[xi],
                  callback_data:array1[xi]
                 },
                     {
                      text: array2[xi],
                      callback_data:array2[xi]
                     }

                     ])),
                             resize_keyboard:true,
                             one_time_keyboard:true
                             }
      })

    })
                 
            

                  });
           

             });

        });
   
     }
  })

  
  
	
db.query(`SELECT * FROM locations WHERE location='${data}'`,function(err,res)
{ var counter=0;
 
  res.map((f,i)=>{
    counter++;
    HashLoc=f.hash;
  })
  if (counter>=1)
  { 
    var location=data;
    var user_id=query.message.chat.id;
    chatID=query.message.chat.id;
    db.query(`UPDATE temp SET location='${location}' WHERE user_id=${user_id}`);
   
   db.query(`SELECT language FROM temp WHERE user_id=${user_id}`,function(err,res)
        {    
             var language=res[0].language;
              if (language =='Uzbek')
            {
              var text=`Сиз <b>${data}</b>  Шаҳрини танладингиз`;
            }
            else if (language=='Russian')
            {
              var text=`Вы выбрали город <b>${data}</b>`;
            } 
                bot.editMessageText(text,{
                chat_id:chatID,
                message_id:message_id,
                parse_mode:"HTML"

    }).then(()=>{
      if (language=="Uzbek")
      {
        var text=`📞📱<b>Сизга богланиш учун Телефон Рақамингизни</b> жўнатинг`;
        var text2=`📲 Телеграмдаги Телефон Рақамингизни жўнатиш`;
        var text3=`🏪 Бошига қайтиш`;
      }
      else if (language=="Russian")
      {
        var text=`📞📱Для того, чтобы связаться с вами , пришлите свой <b>номер телефона</b>`;
          var text2=`📲 Для связи с вами отправьте свой номер телефона`; 
          var text3=`🏪 Назад на главную`;
      }
      bot.sendMessage(chatID,text,{
             parse_mode:"HTML",
             reply_markup:{
              keyboard:[[
             {
                text:text2,
                request_contact: true,

             },

            ],[text3]],
              resize_keyboard:true,
              one_time_keyboard:true
             }
      }).then(()=>{
       user_id=query.message.chat.id;   
       db.query(`UPDATE temp SET flag=1 WHERE user_id=${user_id}`)
        
      })


        

    })
        })
   
  
            
  


  }
})    

    
    
       
     

})
