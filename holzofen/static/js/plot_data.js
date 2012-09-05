define(function(){
    return [
        {
            label: "Oven", /* °C */
            // points: { show: false },
            data: [[0,58],[1,59],[2,61],[3,62],[4,64],[5,65],[6,66],[7,68],[8,69],[9,71],[10,73],[11,75],[12,77],[13,78],[14,81],[15,84],[16,85],[17,87],[18,90],[19,93],[20,94],[21,94],[22,96],[23,98],[24,100],[25,103],[26,107],[27,110],[28,113],[29,115],[30,117],[31,119],[32,121],[33,123],[34,126],[35,129],[36,135],[37,147],[38,157],[39,165],[40,171],[41,179],[42,186],[43,195],[44,205],[45,213],[46,219],[47,212],[48,198],[49,196],[50,196],[51,196],[52,201],[53,211],[54,217],[55,226],[56,234],[57,243],[58,251],[59,257],[60,268],[61,278],[62,287],[63,295],[64,326],[65,336],[66,336],[67,339],[68,347],[69,355],[70,361],[71,367],[72,374],[73,380],[74,384],[75,391],[76,395],[77,402],[78,411],[79,414],[80,419],[81,421],[82,481],[83,474],[84,463],[85,465],[86,472],[87,477],[88,483],[89,494],[90,499],[91,500],[92,497],[93,495],[94,493],[95,493],[96,493],[97,493],[98,494],[99,493],[100,494],[101,495],[102,496],[103,496],[104,498],[105,498],[106,499],[107,499],[108,499],[109,500],[110,501],[111,501],[112,502],[113,503],[114,504],[115,504],[116,504],[117,505],[118,506],[119,507],[120,506],[121,506],[122,505],[123,505],[124,504],[125,504],[126,503],[127,503],[128,503],[129,502],[130,502],[131,501],[132,502],[133,501],[134,501],[135,500],[136,499],[137,499],[138,500],[139,495],[140,493],[141,490],[142,489],[143,488],[144,486],[145,485],[146,484],[147,483],[148,481],[149,480],[150,479],[151,477],[152,476],[153,476],[154,474],[155,474],[156,473],[157,472],[158,469],[159,467],[160,466],[161,463],[162,462],[163,461],[164,459],[165,457],[166,455],[167,453],[168,452],[169,451],[170,460],[171,460],[172,461],[173,461],[174,459],[175,456],[176,446],[177,442],[178,437],[179,435],[180,433],[181,430],[182,428],[183,427],[184,425],[185,423],[186,420],[187,419],[188,416],[189,416],[190,413],[191,412],[192,411],[193,408],[194,405],[195,417],[196,440],[197,452],[198,451],[199,451],[200,450],[201,450],[202,451],[203,449],[204,449],[205,449],[206,449],[207,447],[208,448],[209,447],[210,445],[211,445],[212,446],[213,446],[214,444],[215,445],[216,443],[217,442],[218,439],[219,437],[220,436],[221,434],[222,432],[223,428],[224,426],[225,423],[226,422],[227,418],[228,418],[229,415],[230,413],[231,413],[232,412],[233,410],[234,409],[235,407],[236,405],[237,403],[238,402],[239,401],[240,399],[241,398],[242,395],[243,395],[244,393],[245,385],[246,382],[247,381],[248,377],[249,375],[250,373],[251,371],[252,367],[253,366],[254,365],[255,366],[256,364],[257,358],[258,355],[259,354],[260,354],[261,353],[262,350],[263,347],[264,347],[265,345],[266,343],[267,342],[268,339],[269,337],[270,335],[271,334],[272,333],[273,332],[274,329],[275,328],[276,329],[277,326],[278,325],[279,323],[280,321],[281,319],[282,318],[283,317],[284,316],[285,314],[286,313],[287,311],[288,310],[289,307],[290,307],[291,307],[292,307],[293,305],[294,302],[295,301],[296,301],[297,299],[298,297],[299,296],[300,295],[301,293],[302,293],[303,292],[304,291],[305,290],[306,288],[307,288],[308,286],[309,285],[310,285],[311,284],[312,283],[313,282],[314,281],[315,279],[316,279],[317,279],[318,278],[319,276],[320,276],[321,275],[322,275],[323,275],[324,274],[325,273],[326,272],[327,271],[328,270],[329,268],[330,267],[331,269],[332,269],[333,268],[334,268],[335,267],[336,267],[337,267],[338,265],[339,265],[340,263],[341,262],[342,261],[343,259],[344,258],[345,257],[346,256],[347,256],[348,255],[349,254],[350,254],[351,254],[352,253],[353,253],[354,253],[355,252],[356,251],[357,250],[358,250],[359,249],[360,250],[361,249],[362,249],[363,247],[364,247],[365,246],[366,245],[367,246],[368,245],[369,244],[370,243],[371,242],[372,242],[373,241],[374,239],[375,236],[376,236],[377,234],[378,233],[379,233],[380,233],[381,232],[382,233],[383,233],[384,232],[385,231],[386,230],[387,230],[388,229],[389,229],[390,227],[391,228],[392,227],[393,228],[394,226],[395,225],[396,225],[397,224],[398,224],[399,222],[400,222],[401,221],[402,222],[403,221],[404,220],[405,220],[406,219],[407,219],[408,220],[409,220],[410,220],[411,218],[412,217],[413,217],[414,216],[415,216],[416,216],[417,214],[418,215],[419,214],[420,213],[421,212],[422,212],[423,212],[424,212],[425,211],[426,210],[427,210],[428,212],[429,213],[430,213],[431,213],[432,214],[433,213],[434,212],[435,213],[436,212],[437,213],[438,211],[439,211],[440,211],[441,210],[442,210],[443,210],[444,210],[445,209],[446,209],[447,209],[448,208],[449,208],[450,207],[451,208],[452,207],[453,207],[454,206],[455,206],[456,205],[457,205],[458,204],[459,203],[460,203],[461,202],[462,203],[463,202],[464,202],[465,201],[466,201],[467,201],[468,200],[469,199],[470,199],[471,198],[472,198],[473,197],[474,197],[475,196],[476,196],[477,196],[478,197],[479,196],[480,195],[481,195],[482,194],[483,194],[484,194],[485,194],[486,193],[487,193],[488,192],[489,192],[490,191],[491,192],[492,192],[493,191],[494,190],[495,190],[496,190],[497,190],[498,189],[499,189],[500,189],[501,188],[502,188],[503,188],[504,187],[505,187],[506,187],[507,186],[508,186],[509,185],[510,185],[511,185],[512,185],[513,184],[514,184],[515,184],[516,183],[517,183],[518,182],[519,182],[520,182],[521,181],[522,182],[523,181],[524,181],[525,181],[526,181],[527,180],[528,180],[529,179],[530,179],[531,179],[532,178],[533,178],[534,178],[535,178],[536,177],[537,177],[538,177],[539,176],[540,176],[541,176],[542,175],[543,176],[544,175],[545,175],[546,175],[547,174],[548,174],[549,174],[550,173],[551,173],[552,173],[553,173],[554,172],[555,172],[556,171],[557,171],[558,171],[559,171],[560,170],[561,170],[562,170],[563,170],[564,169],[565,169],[566,168],[567,168],[568,168],[569,168],[570,168],[571,167],[572,167],[573,166],[574,166],[575,166],[576,166],[577,165],[578,165],[579,164],[580,165],[581,164],[582,164],[583,163],[584,164],[585,163],[586,163],[587,163],[588,162],[589,163],[590,162],[591,162],[592,161],[593,162],[594,161],[595,160],[596,161],[597,160],[598,160],[599,160],[600,160],[601,159],[602,158],[603,158],[604,158],[605,158],[606,158],[607,158],[608,157],[609,158],[610,157],[611,158],[612,157],[613,156],[614,156],[615,156],[616,156],[617,156],[618,156],[619,155],[620,155],[621,155],[622,154],[623,154],[624,154],[625,153],[626,154],[627,154],[628,153],[629,153],[630,152],[631,152],[632,152],[633,152],[634,151],[635,151],[636,151],[637,151],[638,151],[639,151],[640,150],[641,150],[642,150],[643,150],[644,150],[645,149],[646,149],[647,149],[648,148],[649,148],[650,148],[651,148],[652,148],[653,147],[654,148],[655,147],[656,147],[657,147],[658,147],[659,147],[660,146],[661,146],[662,146],[663,146],[664,146],[665,145],[666,145],[667,145],[668,145],[669,145],[670,145],[671,144],[672,144],[673,144],[674,143],[675,143],[676,142],[677,142],[678,142],[679,143],[680,142],[681,142],[682,141],[683,142],[684,141],[685,141],[686,140],[687,141],[688,140],[689,140],[690,140],[691,140],[692,140],[693,140],[694,139],[695,139],[696,139],[697,138],[698,138],[699,138],[700,138],[701,138],[702,138],[703,138],[704,138],[705,137],[706,137],[707,137],[708,137],[709,137],[710,136],[711,136],[712,135],[713,135],[714,135],[715,135],[716,135],[717,135],[718,134],[719,134],[720,134],[721,134],[722,134],[723,133],[724,133],[725,133],[726,133],[727,132],[728,132],[729,132],[730,132],[731,132],[732,132],[733,132],[734,132],[735,132],[736,131],[737,131],[738,131],[739,131],[740,131],[741,130],[742,130],[743,130],[744,129],[745,129],[746,130],[747,129],[748,129],[749,129],[750,128],[751,128],[752,128],[753,128],[754,128],[755,127],[756,128],[757,127],[758,127],[759,126],[760,126],[761,126],[762,126],[763,126],[764,126],[765,125],[766,125],[767,125],[768,125],[769,125],[770,125],[771,125],[772,125],[773,125],[774,125],[775,124],[776,125],[777,124],[778,124],[779,123],[780,124],[781,123],[782,123],[783,123],[784,123],[785,123],[786,123],[787,122],[788,122],[789,122],[790,122],[791,122],[792,122],[793,121],[794,121],[795,121],[796,121],[797,121],[798,121],[799,120],[800,120],[801,120],[802,120],[803,120],[804,120],[805,119],[806,120],[807,119],[808,119],[809,118],[810,119],[811,118],[812,118],[813,118],[814,118],[815,118],[816,117],[817,118],[818,117],[819,117],[820,117],[821,117],[822,117],[823,117],[824,117],[825,117],[826,115],[827,115],[828,116],[829,116],[830,115],[831,115],[832,115],[833,114],[834,115],[835,115],[836,114],[837,114],[838,115],[839,114],[840,114],[841,115],[842,114],[843,114],[844,115],[845,114],[846,113],[847,113],[848,113],[849,113],[850,113],[851,113],[852,113],[853,113],[854,112],[855,112],[856,112],[857,112],[858,112],[859,112],[860,112],[861,111],[862,112],[863,111],[864,111],[865,111],[866,111],[867,111],[868,111],[869,110],[870,111],[871,111],[872,110],[873,110],[874,109],[875,110],[876,109],[877,109],[878,110],[879,107],[880,107],[881,107],[882,107],[883,107],[884,108],[885,107],[886,106],[887,106],[888,107],[889,106],[890,106],[891,106],[892,105],[893,106],[894,106],[895,106],[896,105],[897,105],[898,105],[899,105],[900,105],[901,105],[902,106],[903,105],[904,105],[905,105],[906,104],[907,105],[908,105],[909,104],[910,105],[911,104],[912,104],[913,104],[914,103],[915,103],[916,104],[917,103],[918,104],[919,103],[920,103],[921,103],[922,103],[923,103],[924,103],[925,103],[926,103],[927,103],[928,102],[929,102],[930,102],[931,102],[932,101],[933,101],[934,102],[935,101],[936,101],[937,101],[938,101],[939,100],[940,100],[941,101],[942,100],[943,101],[944,100],[945,101],[946,100],[947,99],[948,99],[949,100],[950,99],[951,100],[952,99],[953,99],[954,99],[955,99],[956,98],[957,99],[958,98],[959,98],[960,99],[961,98],[962,98],[963,97],[964,98],[965,98],[966,98],[967,97],[968,97],[969,97],[970,97],[971,96],[972,96],[973,96],[974,96],[975,96],[976,96],[977,96],[978,96],[979,96],[980,95],[981,95],[982,95],[983,95],[984,95],[985,95],[986,95],[987,95],[988,94],[989,94],[990,94],[991,94],[992,94],[993,94],[994,94],[995,94],[996,94],[997,93],[998,94],[999,94],[1000,93],[1001,93],[1002,93],[1003,93],[1004,93],[1005,92],[1006,92],[1007,92],[1008,93],[1009,92],[1010,92],[1011,92],[1012,92],[1013,92],[1014,92],[1015,92],[1016,92],[1017,91],[1018,91],[1019,91],[1020,91],[1021,91],[1022,91],[1023,91],[1024,91],[1025,91],[1026,91],[1027,90],[1028,90],[1029,90],[1030,90],[1031,90],[1032,90],[1033,90],[1034,90],[1035,90],[1036,90],[1037,89],[1038,90],[1039,89],[1040,90],[1041,89],[1042,89],[1043,90],[1044,89],[1045,89],[1046,89],[1047,88],[1048,89],[1049,89],[1050,89],[1051,88],[1052,89],[1053,88],[1054,88],[1055,88],[1056,88],[1057,88],[1058,88],[1059,87],[1060,87],[1061,87],[1062,87],[1063,87],[1064,87],[1065,87],[1066,87],[1067,86],[1068,86],[1069,87],[1070,87],[1071,87],[1072,87],[1073,86],[1074,87],[1075,87],[1076,86],[1077,86],[1078,86],[1079,86],[1080,86],[1081,85],[1082,86],[1083,85],[1084,86],[1085,86],[1086,85],[1087,85],[1088,85],[1089,85],[1090,85],[1091,85],[1092,85],[1093,84]]
        },
        {
            label: "Brick", /* °C */
            // points: { show: false },
            data: [[0,19],[1,19],[2,19],[3,19],[4,20],[5,20],[6,20],[7,20],[8,20],[9,20],[10,21],[11,21],[12,21],[13,22],[14,22],[15,22],[16,22],[17,23],[18,24],[19,24],[20,24],[21,24],[22,25],[23,25],[24,26],[25,26],[26,27],[27,27],[28,28],[29,28],[30,29],[31,29],[32,29],[33,30],[34,31],[35,31],[36,32],[37,33],[38,33],[39,34],[40,34],[41,35],[42,36],[43,37],[44,37],[45,38],[46,39],[47,40],[48,41],[49,41],[50,42],[51,43],[52,44],[53,45],[54,46],[55,47],[56,48],[57,49],[58,50],[59,51],[60,52],[61,53],[62,54],[63,56],[64,56],[65,58],[66,59],[67,60],[68,61],[69,62],[70,63],[71,64],[72,65],[73,67],[74,67],[75,69],[76,70],[77,71],[78,73],[79,74],[80,75],[81,77],[82,78],[83,79],[84,81],[85,82],[86,83],[87,85],[88,86],[89,88],[90,90],[91,91],[92,93],[93,95],[94,96],[95,98],[96,100],[97,102],[98,103],[99,105],[100,107],[101,108],[102,110],[103,112],[104,114],[105,116],[106,118],[107,120],[108,121],[109,123],[110,125],[111,127],[112,129],[113,131],[114,133],[115,135],[116,137],[117,139],[118,141],[119,143],[120,145],[121,147],[122,149],[123,151],[124,153],[125,155],[126,157],[127,159],[128,161],[129,162],[130,165],[131,167],[132,168],[133,170],[134,172],[135,174],[136,176],[137,177],[138,179],[139,181],[140,183],[141,185],[142,186],[143,188],[144,190],[145,191],[146,193],[147,194],[148,196],[149,198],[150,200],[151,201],[152,203],[153,204],[154,206],[155,207],[156,209],[157,210],[158,211],[159,213],[160,215],[161,216],[162,217],[163,219],[164,220],[165,222],[166,223],[167,224],[168,225],[169,227],[170,228],[171,230],[172,231],[173,232],[174,233],[175,234],[176,235],[177,237],[178,238],[179,239],[180,240],[181,241],[182,242],[183,243],[184,245],[185,246],[186,246],[187,248],[188,249],[189,250],[190,250],[191,252],[192,252],[193,253],[194,254],[195,255],[196,256],[197,256],[198,257],[199,258],[200,259],[201,260],[202,261],[203,261],[204,262],[205,263],[206,264],[207,264],[208,265],[209,266],[210,266],[211,267],[212,268],[213,268],[214,269],[215,270],[216,270],[217,271],[218,271],[219,272],[220,273],[221,273],[222,274],[223,274],[224,275],[225,276],[226,276],[227,277],[228,277],[229,278],[230,279],[231,280],[232,280],[233,280],[234,281],[235,282],[236,282],[237,283],[238,283],[239,284],[240,284],[241,285],[242,286],[243,286],[244,286],[245,287],[246,288],[247,288],[248,288],[249,289],[250,290],[251,290],[252,290],[253,291],[254,291],[255,292],[256,292],[257,292],[258,293],[259,293],[260,294],[261,294],[262,294],[263,295],[264,295],[265,295],[266,296],[267,296],[268,296],[269,296],[270,297],[271,297],[272,298],[273,298],[274,298],[275,298],[276,298],[277,299],[278,299],[279,299],[280,299],[281,299],[282,299],[283,300],[284,300],[285,300],[286,301],[287,301],[288,300],[289,300],[290,301],[291,301],[292,301],[293,301],[294,301],[295,301],[296,301],[297,302],[298,301],[299,301],[300,301],[301,301],[302,302],[303,301],[304,302],[305,301],[306,302],[307,301],[308,301],[309,302],[310,301],[311,301],[312,301],[313,301],[314,301],[315,301],[316,301],[317,301],[318,301],[319,301],[320,300],[321,301],[322,301],[323,300],[324,300],[325,300],[326,300],[327,300],[328,300],[329,299],[330,300],[331,299],[332,299],[333,299],[334,299],[335,299],[336,298],[337,298],[338,298],[339,298],[340,298],[341,297],[342,297],[343,297],[344,297],[345,297],[346,297],[347,297],[348,296],[349,296],[350,296],[351,296],[352,295],[353,295],[354,295],[355,295],[356,295],[357,294],[358,294],[359,294],[360,293],[361,293],[362,293],[363,293],[364,292],[365,292],[366,292],[367,292],[368,292],[369,292],[370,292],[371,291],[372,290],[373,290],[374,291],[375,290],[376,290],[377,289],[378,289],[379,289],[380,288],[381,289],[382,288],[383,288],[384,287],[385,287],[386,287],[387,287],[388,286],[389,286],[390,286],[391,285],[392,285],[393,285],[394,285],[395,284],[396,284],[397,284],[398,283],[399,283],[400,283],[401,282],[402,282],[403,282],[404,282],[405,281],[406,281],[407,280],[408,280],[409,280],[410,279],[411,279],[412,279],[413,279],[414,279],[415,278],[416,277],[417,277],[418,277],[419,277],[420,277],[421,276],[422,276],[423,275],[424,275],[425,274],[426,274],[427,274],[428,273],[429,273],[430,273],[431,272],[432,273],[433,272],[434,271],[435,271],[436,271],[437,271],[438,271],[439,270],[440,270],[441,269],[442,269],[443,269],[444,268],[445,268],[446,268],[447,267],[448,267],[449,267],[450,267],[451,266],[452,266],[453,265],[454,265],[455,265],[456,264],[457,264],[458,264],[459,264],[460,263],[461,263],[462,262],[463,262],[464,261],[465,262],[466,261],[467,260],[468,260],[469,260],[470,260],[471,259],[472,259],[473,258],[474,258],[475,258],[476,257],[477,257],[478,257],[479,257],[480,257],[481,256],[482,256],[483,255],[484,255],[485,254],[486,254],[487,254],[488,253],[489,254],[490,253],[491,253],[492,253],[493,252],[494,252],[495,251],[496,251],[497,251],[498,250],[499,250],[500,250],[501,249],[502,249],[503,249],[504,248],[505,248],[506,248],[507,248],[508,246],[509,247],[510,246],[511,246],[512,245],[513,245],[514,245],[515,245],[516,244],[517,244],[518,243],[519,243],[520,243],[521,243],[522,242],[523,242],[524,241],[525,241],[526,241],[527,241],[528,240],[529,240],[530,240],[531,239],[532,239],[533,238],[534,238],[535,238],[536,238],[537,237],[538,237],[539,236],[540,236],[541,236],[542,236],[543,235],[544,235],[545,235],[546,234],[547,234],[548,233],[549,233],[550,233],[551,233],[552,233],[553,232],[554,232],[555,231],[556,231],[557,230],[558,231],[559,230],[560,230],[561,229],[562,229],[563,229],[564,228],[565,228],[566,227],[567,227],[568,227],[569,227],[570,226],[571,226],[572,226],[573,225],[574,225],[575,225],[576,224],[577,224],[578,224],[579,224],[580,223],[581,223],[582,223],[583,223],[584,222],[585,222],[586,221],[587,221],[588,221],[589,220],[590,220],[591,220],[592,220],[593,219],[594,219],[595,219],[596,218],[597,218],[598,217],[599,217],[600,217],[601,217],[602,216],[603,216],[604,216],[605,215],[606,215],[607,215],[608,215],[609,214],[610,214],[611,214],[612,213],[613,213],[614,212],[615,212],[616,212],[617,212],[618,211],[619,211],[620,211],[621,210],[622,210],[623,209],[624,210],[625,209],[626,209],[627,208],[628,208],[629,208],[630,208],[631,207],[632,207],[633,207],[634,207],[635,206],[636,206],[637,206],[638,205],[639,205],[640,205],[641,204],[642,204],[643,203],[644,203],[645,203],[646,203],[647,203],[648,202],[649,202],[650,202],[651,201],[652,201],[653,201],[654,201],[655,200],[656,200],[657,200],[658,200],[659,199],[660,199],[661,198],[662,198],[663,198],[664,197],[665,197],[666,197],[667,197],[668,196],[669,196],[670,196],[671,195],[672,195],[673,195],[674,195],[675,194],[676,194],[677,194],[678,193],[679,193],[680,193],[681,193],[682,193],[683,193],[684,192],[685,192],[686,192],[687,191],[688,191],[689,191],[690,191],[691,190],[692,190],[693,189],[694,189],[695,189],[696,189],[697,189],[698,188],[699,188],[700,188],[701,188],[702,187],[703,187],[704,187],[705,186],[706,186],[707,186],[708,186],[709,186],[710,185],[711,185],[712,185],[713,184],[714,184],[715,184],[716,183],[717,184],[718,183],[719,183],[720,182],[721,182],[722,182],[723,181],[724,181],[725,181],[726,181],[727,180],[728,180],[729,180],[730,180],[731,179],[732,179],[733,179],[734,179],[735,179],[736,178],[737,178],[738,178],[739,177],[740,177],[741,177],[742,177],[743,176],[744,176],[745,176],[746,176],[747,176],[748,175],[749,175],[750,175],[751,174],[752,174],[753,174],[754,174],[755,174],[756,173],[757,173],[758,173],[759,173],[760,172],[761,172],[762,172],[763,171],[764,171],[765,171],[766,171],[767,171],[768,170],[769,170],[770,169],[771,170],[772,169],[773,169],[774,169],[775,168],[776,169],[777,168],[778,168],[779,167],[780,168],[781,167],[782,167],[783,167],[784,166],[785,166],[786,166],[787,166],[788,165],[789,165],[790,165],[791,165],[792,164],[793,165],[794,164],[795,164],[796,164],[797,164],[798,163],[799,163],[800,163],[801,162],[802,162],[803,162],[804,162],[805,161],[806,161],[807,161],[808,161],[809,161],[810,161],[811,160],[812,160],[813,160],[814,159],[815,160],[816,159],[817,159],[818,158],[819,159],[820,158],[821,158],[822,158],[823,158],[824,158],[825,157],[826,157],[827,156],[828,156],[829,156],[830,156],[831,156],[832,155],[833,156],[834,155],[835,155],[836,154],[837,155],[838,154],[839,154],[840,154],[841,154],[842,154],[843,153],[844,153],[845,153],[846,152],[847,152],[848,152],[849,152],[850,151],[851,152],[852,151],[853,151],[854,151],[855,151],[856,150],[857,150],[858,150],[859,150],[860,150],[861,150],[862,149],[863,149],[864,149],[865,149],[866,149],[867,148],[868,148],[869,148],[870,148],[871,148],[872,147],[873,147],[874,147],[875,146],[876,147],[877,146],[878,146],[879,146],[880,146],[881,145],[882,145],[883,145],[884,144],[885,144],[886,144],[887,144],[888,144],[889,144],[890,143],[891,144],[892,143],[893,143],[894,143],[895,143],[896,142],[897,142],[898,142],[899,142],[900,142],[901,141],[902,141],[903,141],[904,141],[905,141],[906,140],[907,141],[908,140],[909,140],[910,140],[911,139],[912,140],[913,140],[914,139],[915,139],[916,139],[917,138],[918,139],[919,138],[920,138],[921,138],[922,137],[923,138],[924,137],[925,137],[926,137],[927,137],[928,137],[929,136],[930,136],[931,136],[932,136],[933,136],[934,136],[935,135],[936,135],[937,135],[938,135],[939,134],[940,134],[941,134],[942,134],[943,134],[944,134],[945,133],[946,133],[947,133],[948,132],[949,133],[950,133],[951,132],[952,132],[953,131],[954,131],[955,131],[956,132],[957,131],[958,131],[959,131],[960,131],[961,131],[962,130],[963,130],[964,130],[965,130],[966,129],[967,129],[968,129],[969,129],[970,129],[971,129],[972,128],[973,128],[974,128],[975,128],[976,128],[977,128],[978,128],[979,127],[980,127],[981,127],[982,127],[983,127],[984,127],[985,126],[986,126],[987,126],[988,126],[989,126],[990,125],[991,125],[992,125],[993,125],[994,124],[995,125],[996,124],[997,124],[998,124],[999,124],[1000,123],[1001,123],[1002,123],[1003,123],[1004,123],[1005,123],[1006,123],[1007,123],[1008,122],[1009,122],[1010,122],[1011,122],[1012,122],[1013,122],[1014,122],[1015,121],[1016,121],[1017,121],[1018,121],[1019,121],[1020,121],[1021,120],[1022,120],[1023,120],[1024,120],[1025,120],[1026,120],[1027,119],[1028,120],[1029,119],[1030,119],[1031,119],[1032,119],[1033,118],[1034,119],[1035,119],[1036,118],[1037,118],[1038,118],[1039,118],[1040,118],[1041,117],[1042,117],[1043,117],[1044,117],[1045,117],[1046,116],[1047,117],[1048,116],[1049,116],[1050,116],[1051,116],[1052,116],[1053,116],[1054,116],[1055,115],[1056,115],[1057,115],[1058,115],[1059,115],[1060,114],[1061,115],[1062,114],[1063,114],[1064,114],[1065,114],[1066,113],[1067,114],[1068,113],[1069,113],[1070,113],[1071,113],[1072,113],[1073,113],[1074,112],[1075,112],[1076,112],[1077,112],[1078,112],[1079,112],[1080,112],[1081,111],[1082,112],[1083,111],[1084,111],[1085,111],[1086,111],[1087,111],[1088,111],[1089,110],[1090,110],[1091,110],[1092,110],[1093,110]]
        }
    ];
});