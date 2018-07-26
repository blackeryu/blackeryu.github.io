//=============================================================
/*
2018.07.26 調整取得角色資料來源自API
*/
//=============================================================

var testDM = DataManager;

function getCurrentActors(){
	var _actors;
	$.ajax({
		cache:false,
		async: false,
		type:"POST",
		url:"http://localhost:7124/Home/GetPartyActors/",
		success:function(res){
			_actors = res;
		}
	});
	
	return _actors;
}

testDM._databaseFiles = [
    { name: '$dataActors',       src: getCurrentActors    },
    { name: '$dataClasses',      src: 'Classes.json'      },
    { name: '$dataSkills',       src: 'Skills.json'       },
    { name: '$dataItems',        src: 'Items.json'        },
    { name: '$dataWeapons',      src: 'Weapons.json'      },
    { name: '$dataArmors',       src: 'Armors.json'       },
    { name: '$dataEnemies',      src: 'Enemies.json'      },
    { name: '$dataTroops',       src: 'Troops.json'       },
    { name: '$dataStates',       src: 'States.json'       },
    { name: '$dataAnimations',   src: 'Animations.json'   },
    { name: '$dataTilesets',     src: 'Tilesets.json'     },
    { name: '$dataCommonEvents', src: 'CommonEvents.json' },
    { name: '$dataSystem',       src: 'System.json'       },
    { name: '$dataMapInfos',     src: 'MapInfos.json'     }
];

testDM.loadDatabase = function() {
    var test = this.isBattleTest() || this.isEventTest();
    var prefix = test ? 'Test_' : '';
    for (var i = 0; i < this._databaseFiles.length; i++) {
        var name = this._databaseFiles[i].name;
		var src = this._databaseFiles[i].src;
		if(typeof src === "function") { //是函数    其中 FunName 为函数名称
			window[name] = src();
        } else { //不是函数
			this.loadDataFile(name, prefix + src);
        }
    }
    if (this.isEventTest()) {
        this.loadDataFile('$testEvent', prefix + 'Event.json');
    }
};