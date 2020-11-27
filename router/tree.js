/**
 *
 * @author anguer
 * @date Create by 2019-09-18
 */

import { PRIVILEGE } from '@/constants';
/* Layout */
import Layout from '@/layout/Layout';

/**
 * 构建菜单数据结构
 * @param source      扁平数据数组
 * @param id          唯一标识符字段名
 * @param parentId    标识父级字段名
 * @param children    标识子级字段名
 * @returns {*}
 */
export default function (source = [], id = 'id', parentId = 'parentId', children = 'children') {
  const cloneData = JSON.parse(JSON.stringify(source)).filter(o => !(o.parentId === 0 && o.type === PRIVILEGE.BUTTON));
  return cloneData.filter((parent) => {
    const branchArr = cloneData.filter(child => (parent[id] === child[parentId] && child.type === PRIVILEGE.MENU));
    const buttons = cloneData.filter(child => (parent[id] === child[parentId] && child.type === PRIVILEGE.BUTTON));
    parent[children] = branchArr.length > 0 ? branchArr : '';

    const p = parent.path;

    if (parent[parentId] === 0) {
      parent.component = Layout;

      if (branchArr.length > 0) {
        parent[children] = branchArr;
        parent.redirect = 'noredirect';
        parent.alwaysShow = true;
        parent.meta = {
          title: parent.name,
          icon: parent.icon,
          buttons
        };
      } else {
        parent[children] = [
          {
            path: '',
            // set name to default child
            name: parent.name + parent.id,
            component: () => import(`../views${p}`),
            meta: { title: parent.name, icon: parent.icon, buttons }
          }
        ];
      }
    } else {
      parent.component = () => import(`../views${p}`);
      parent.meta = {
        title: parent.name,
        icon: parent.icon,
        buttons
      };
    }

    if (parent[parentId] === 0 && !branchArr.length) {
      // remove name for default child
      delete parent.name;
    } else {
      parent.name += parent.id;
    }
    parent.path = parent.url;

    // 如果第一层不是parentId=0，请自行修改
    return parent[parentId] === 0;
  });
}

export function getOverviewModules (source) {
  const routes = JSON.parse(JSON.stringify(source));
  return routes.filter(o => o.parentId === 0 && o.type === PRIVILEGE.BUTTON);
}
