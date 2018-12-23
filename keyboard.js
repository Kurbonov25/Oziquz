
const kb=require('./keyboard-button.js')
const kb2=require('./keyboard-button2.js')
module.exports =
{
     home:[
               [kb.Home.Uzbek],
               [kb.Home.Russian]

          ],
     choice:[
               [kb.Choice.sell,kb.Choice.buy],
               [kb.Choice.help,kb.Choice.back]

            ] ,
      backfromCat:[
                     [kb.GoHome.goHome,kb.BackfromCat.goBack]
                  ], 
      backfromDesc:[
                         [kb.GoHome.goHome]
                  ],

      phone:      [
                        [kb.Phone.phone,kb.GoHome.goHome]
                  ],
      desc:       [
                        [kb.Desc.continue,kb.GoHome.goHome]
                  ],
      final:      [
                        [kb.Final.approve,kb.GoHome.goHome]
                  ] ,
 ////////////////////////////////////In Rus////////////////////////////////////////
      choice2:[
                         [kb2.Choice.sell,kb2.Choice.buy],
                         [kb2.Choice.help,kb2.Choice.back]

              ] ,
      backfromCat2:     
              [
                           [kb2.GoHome.goHome,kb2.BackfromCat.goBack]
              ], 
     backfromDesc2:
              [
                           [kb2.GoHome.goHome]
              ],

       phone2: 
             [
                          [kb2.Phone.phone,kb2.GoHome.goHome]
             ],
        desc2: 
             [
                          [kb2.Desc.continue,kb2.GoHome.goHome]
             ],
        final2:    
             [
                         [kb2.Final.approve,kb2.GoHome.goHome]
             ] ,

        broadcast:[

                          [kb.Broadcast.skip]
                  ],

        broadcast2: [

                             [kb.Broadcast2.declare, kb.Broadcast2.Cancel]
                    ],
           goBroadcast: [
           
                          [kb.GoBroadcast.goBroadcast]
                         ]         
                                               
                  

}