addLayer("r", {
    name: "级别", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "r", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#00FF00",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "级别", // Name of prestige currency
    baseResource: "g质量", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal:膨胀资源层 static: 非膨胀资源层 使用时要加双引号
    exponent: 0.8, // Prestige currency exponent 初始值0.5
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
       
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(hasMilestone("t",0)?0.225:0.175)
    },
    milestones: {
        0: {
            requirementDescription: "级别1",
            effectDescription: "解锁锻体器",
            done() { return player.r.points.gte(1) }
        },
        1: {
            requirementDescription: "级别2",
            effectDescription: "解锁助推器",
            done() { return player.r.points.gte(2)&&player.s.points.gte(1) },
            unlocked(){return hasMilestone("r",0)&&player.s.points.gte(1)},  
        },    
        2: {
            requirementDescription: "级别3",
            effectDescription: "解锁强化器",
            done() { return player.r.points.gte(3)&&player.s.points.gte(2) },
            unlocked(){return hasMilestone("r",1)&&player.s.points.gte(2)},  
        },    
        3: {
            requirementDescription: "级别4",
            effectDescription: "解锁阶层",
            done() { return player.r.points.gte(4)&&player.s.points.gte(3) },
            unlocked(){return hasMilestone("r",2)&&player.s.points.gte(3)},  
        },    
        4: {
            requirementDescription: "级别5",
            effectDescription: "锻体器效果x(质量+1)",
            done() { return player.r.points.gte(5)&&player.s.points.gte(5) },
            unlocked(){return hasMilestone("r",3)&&player.s.points.gte(5)},  
        },    
        5: {
            requirementDescription: "级别6",
            effectDescription: "助推器效果x(质量+1)",
            done() { return player.r.points.gte(5)&&player.s.points.gte(5) },
            unlocked(){return hasMilestone("r",3)&&player.s.points.gte(5)},  
        },    
    },
    upgrades: {
        11:{ title: "锻体器",
         description: "质量获取+质量",
         cost:new Decimal(10),
         currencyDisplayName: "g质量",
         currencyInternalName: "points",
         unlocked(){return hasMilestone("r",0)},  
        }, 
        12:{ title: "助推器",
            description: "质量获取x(质量+1)",
            cost:new Decimal(100),
            currencyDisplayName: "g质量",
            currencyInternalName: "points",
            unlocked(){return hasMilestone("r",1)},  
           }, 
        13:{ title: "强化器",
            description: "质量获取^(质量+1)",
            cost:new Decimal(1000),
            currencyDisplayName: "g质量",
            currencyInternalName: "points",
            unlocked(){return hasMilestone("r",2)},  
           }, 

                                                                          
       },

    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "r: 进行级别重置", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
addLayer("t", {
    name: "阶层", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "t", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#fbc618",
    requires: new Decimal(4), // Can be a function that takes requirement increases into account
    resource: "阶层", // Name of prestige currency
    baseResource: "级别", // Name of resource prestige is based on
    baseAmount() {return player.r.points}, // Get the current amount of baseResource
    type: "static", // normal:膨胀资源层 static: 非膨胀资源层 使用时要加双引号
    exponent: 1, // Prestige currency exponent 初始值0.5
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
       
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    milestones: {
        0: {
            requirementDescription: "阶层1",
            effectDescription: "质量获取^1.2,降低级别价格",
            done() { return player.t.points.gte(1) }
        },
      

                                                                          
       },

    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "t: 进行阶层重置", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.r.points.gte(4)||player.t.points.gte(1) }
})
addLayer("s", {
    name: "软上限", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "s", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#1f1e33",
    requires: new Decimal(1e9), // Can be a function that takes requirement increases into account
    resource: "条软上限", // Name of prestige currency
    baseResource: "g质量", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal:膨胀资源层 static: 非膨胀资源层 使用时要加双引号
    exponent: 1, // Prestige currency exponent 初始值0.5
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
       
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    milestones: {
        0: {
            requirementDescription: "质量一重软上限",
            effectDescription: "质量获取超过10后^0.45",
            done() { return player.s.points.gte(1)},
            unlocked(){return player.s.points.gte(1)},      
        },
        1: {
            requirementDescription: "质量二重软上限",
            effectDescription: "质量获取超过1000后^0.2",
            done() { return player.s.points.gte(2)},
            unlocked(){return hasMilestone("s",0)},  
        },
        2: {
            requirementDescription: "强化器一重软上限",
            effectDescription: "强化器效果超过1.1后^0.1",
            done() { return player.s.points.gte(3)},
            unlocked(){return hasMilestone("s",1)},  
        },
        3: {
            requirementDescription: "锻体器一重软上限",
            effectDescription: "锻体器效果超过100后^0.5",
            done() { return player.s.points.gte(4)},
            unlocked(){return hasMilestone("s",2)},  
        },
        4: {
            requirementDescription: "助推器一重软上限",
            effectDescription: "助推器效果超过100后^0.5,软上限条数加成质量",
            done() { return player.s.points.gte(5)},
            unlocked(){return hasMilestone("s",3)},  
        },
        5: {
            requirementDescription: "强化器二重软上限",
            effectDescription: "强化器效果超过2后^0.01,软上限条数加成锻体器效果",
            done() { return player.s.points.gte(6)},
            unlocked(){return hasMilestone("s",4)},  
        },
        6: {
            requirementDescription: "恭喜通关！",
            effectDescription: "2025愚人节快乐!",
            done() { return player.s.points.gte(7)},
            unlocked(){return player.s.points.gte(7)},  
        },
    },
   

    row: 999, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "s: 进行软上限重置", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.points.gte(1e9)||player.s.points.gte(1)}
})
