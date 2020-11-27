export default {
  file: {
    upload: '/file/upload',
    list: '/file/list',
    batchDownload: '/file/batchDownload'
  },

  home: {
    surveyEnterprise: '/home/surveyEnterprise',
    captableOverview: '/home/captableOverview',
    employeeOverview: '/home/employeeOverview'
  },

  account: {
    info: '/account/info',
    inviteRegister: '/account/inviteRegister',
    remindSubjectAuthorization: '/account/remindSubjectAuthorization',
    remindSubjectCertification: '/account/remindSubjectCertification',
    agreeToRenew: '/account/agreeToRenew',
    managerList: '/account/managerList',
    getManagerPrice: '/account/getManagerPrice',
    getEntRoles: '/account/getEntRoles',
    managerInfo: '/account/managerInfo',
    createManager: '/account/createManager',
    updateManager: '/account/updateManager',
    deleteManager: '/account/deleteManager',
    renewManager: '/account/renewManager',
    getEncryption: '/account/getEncryption',
    signSeal: '/account/signSeal',
    downloadEmployeeExcel: '/account/downloadEmployeeExcel',
    update: '/account/update',
    getTelCode: '/account/getTelCode',
    changeTel: '/account/changeTel',
    getEmailCode: '/account/getEmailCode',
    changeEmail: '/account/changeEmail',
    checkOriginalPassword: '/account/checkOriginalPassword',
    updatePassword: '/account/updatePassword',
    remindUpload: '/account/remindUpload'
  },

  employee: {
    all: '/account/employeeAll',
    list: '/account/employeeList',
    getBatchEmployeeList: '/account/getBatchEmployeeList',
    createBatchEmployees: '/account/createBatchEmployees',
    create: '/account/createEmployee',
    update: '/account/updateEmployee',
    remove: '/account/deleteEmployee',
    disableEmployee: '/account/disableEmployee'
  },

  // 企业列表
  enterprise: {
    info: '/enterprise/info',
    choose: '/enterprise/choose',
    initBaseInfo: '/enterprise/initBaseInfo',
    initialize: '/enterprise/initialize',
    all: '/enterprise/all',
    create: '/enterprise/create',
    update: '/enterprise/update',
    remove: '/enterprise/remove',
    generalView: '/enterprise/generalView',
    autoRenew: '/enterprise/autoRenew',
    shortRemind: '/enterprise/shortRemind',
    netAssetsHistory: '/enterprise/netAssetsHistory',
    updateNetAssets: '/enterprise/updateNetAssets'
  },

  optionPoolSubject: {
    all: '/optionPoolSubject/all',
    create: '/optionPoolSubject/create',
    update: '/optionPoolSubject/update',
    remove: '/optionPoolSubject/remove',
    statistics: '/optionPoolSubject/statistics'
  },

  optionPool: {
    statistics: '/optionPool/statistics'
  },

  equity: {
    info: '/equity/info',
    list: '/equity/list',
    create: '/equity/create',
    createAward: '/equity/createAward',
    statistics: '/equity/statistics',
    getBatchAwardList: '/equity/getBatchAwardList',
    downloadAwardExcel: '/equity/downloadAwardExcel',
    createBatchAward: '/equity/createBatchAward',
    equityDetail: '/equity/equityDetail',
    overview: '/equity/equityOverview',
    exerciseRecord: '/equity/exerciseRecord',
    buyBackRecord: '/equity/buyBackRecord',
    ripeUnfreezeRecord: '/equity/ripeUnfreezeRecord',
    exerciseDetails: '/equity/exerciseDetails',
    employeeSignRepurchaseDetail: '/equity/employeeSignRepurchaseDetail',
    exercisable: '/equity/exercisable',
    certificate: '/equity/certificate'
  },

  equityAction: {
    remove: '/equityAction/remove',
    updateAward: '/equityAction/updateAward',
    decideAward: '/equityAction/decideAward',
    remindSign: '/equityAction/remindSign',
    awardDetermination: '/equityAction/awardDetermination',
    cancelEquity: '/equityAction/cancelEquity',
    batchAccountOpen: '/equityAction/batchAccountOpen',
    createContract: '/equityAction/createContract',
    signContract: '/equityAction/signContract',
    refuseSignToContract: '/equityAction/RefuseSignToContract',
    getRepurchaseInfo: '/equityAction/getRepurchaseInfo',
    createRepurchase: '/equityAction/createRepurchase',
    createChangeRepurchase: '/equityAction/createChangeRepurchase',
    extendPeriodRepurchase: '/equityAction/extendPeriodRepurchase',
    exercise: '/equityAction/exercise',
    exportExcel: '/equityAction/exportExcel',
    agreeToExercise: '/equityAction/agreeToExercise',
    refuseToExercise: '/equityAction/refuseToExercise',
    cancelToExercise: '/equityAction/cancelToExercise',
    employeesAgreeToShareTransfer: '/equityAction/employeesAgreeToShareTransfer',
    employeesRefuseToShareTransfer: '/equityAction/employeesRefuseToShareTransfer',
    employeeSignRepurchase: '/equityAction/employeeSignRepurchase',
    employeeSignRevokeAgreement: '/equityAction/employeeSignRevokeAgreement',
    employeeRefuseRevokeAgreement: '/equityAction/employeeRefuseRevokeAgreement',
    overdueExercise: '/equityAction/overdueExercise',
    findAccountOpenMoney: '/equityAction/findAccountOpenMoney',
    overdueAward: '/equityAction/overdueAward'
  },

  ripeUnfreezePlan: {
    list: '/ripeUnfreezePlan/list',
    all: '/ripeUnfreezePlan/all',
    create: '/ripeUnfreezePlan/create',
    update: '/ripeUnfreezePlan/update',
    remove: '/ripeUnfreezePlan/remove'
  },

  // 激励计划
  incentivePlan: {
    list: '/incentivePlan/list',
    all: '/incentivePlan/all',
    info: '/incentivePlan/info',
    create: '/incentivePlan/create',
    remove: '/incentivePlan/remove',
    getPreInfo: '/incentivePlan/getPreInfo',
    preview: '/incentivePlan/preview',
    updateFile: '/incentivePlan/updateFile'
  },

  // 激励来源
  incentiveOptionSubject: {
    all: '/incentiveOptionSubject/all'
  },

  message: {
    list: '/message/list',
    employeeMsgList: '/message/employeeMsgList',
    read: '/message/read'
  },

  industry: {
    all: '/industry/all'
  },

  framework: {
    all: '/framework/all',
    statistics: '/framework/statistics',
    create: '/framework/create',
    remove: '/framework/remove',
    update: '/framework/update'
  },

  // 认证
  cert: {
    enterprise: '/cert/enterprise',
    phone: '/cert/phone',
    card: '/cert/card',
    face: '/cert/face',
    other: '/cert/other',
    shortUrl: '/loosely/certShortUrl'
  },

  // 协议
  protocol: {
    award: '/protocol/award',
    preview: '/protocol/preview'
  },

  assets: {
    all: '/assets/all'
  },

  // 咨询成果
  consult: {
    list: '/consult/list'
  },

  // 角色
  role: {
    list: '/role/list',
    privilegeTree: '/role/privilegeTree',
    info: '/role/info',
    create: '/role/create',
    update: '/role/update',
    remove: '/role/remove'
  },

  // 明细
  transaction: {
    list: '/transaction/list',
    info: '/transaction/info'
  },

  // 投资机构
  investOrgan: {
    list: '/investOrgan/list',
    create: '/investOrgan/create',
    update: '/investOrgan/update',
    remove: '/investOrgan/remove'
  },

  // 股权
  captable: {
    overview: '/captable/overview',
    info: '/captable/info',
    holderSource: '/captable/holderSource',
    shareholders: '/captable/shareholders',
    rounds: '/captable/rounds',
    establish: '/captable/establish',
    financing: '/captable/financing',
    increase: '/captable/increase',
    transfer: '/captable/transfer',
    splitShare: '/captable/splitShare',
    export: '/captable/export',
    remove: '/captable/remove',
    update: '/captable/update'
  },

  // 融资轮次
  round: {
    all: '/round/all',
    save: '/round/save'
  },

  pay: {
    alipay: '/pay/alipay'
  },

  // 智能推荐
  recommend: {
    reckon: '/reckon'
  }

};
