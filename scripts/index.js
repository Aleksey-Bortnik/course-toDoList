import Tabs from './tabs.js'
import Popup from './popup.js'
import Table from './table.js'
import allTables from './allTables.js'

const tabsController = new Tabs();
const popupController = new Popup();

allTables.current = new Table("current-list");
allTables.done = new Table("done-list");
allTables.deleted = new Table("deleted-list");

