import React from 'react';
import Link from 'next/link';
import { Menu, Dropdown, Icon } from 'antd';
import Router from 'next/router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../../../store';
import { updateUserInfo } from '../../../../store/account';
import { updateCollectionFavoriteIdList } from '../../../../store/account/person';
import api from '../../../../api';
import './index.less';

// 当前组件的类型声明
interface ConnectState {
  // redux 存储的用户信息
  userInfo: any,
  siteInfo: any;
}

interface ConnectDispatch {
  // 修改用户状态
  updateUserInfo: (data: any) => object;
  // 修改我收藏的收藏品id
  updateCollectionFavoriteIdList: (data: any) => object;
}

interface Props extends ConnectState, ConnectDispatch {
}

interface State {
}

// 当前组件类
export default compose<React.ComponentClass>(
  connect<ConnectState, ConnectDispatch, Props>(
    (state: any | AppState) => ({
      userInfo: state.account.userInfo,
      siteInfo: state.site.siteInfo
    }),
    {
      updateUserInfo,
      updateCollectionFavoriteIdList
    }
  )
)(
  class HeaderAction extends React.Component<Props, State> {
    /**
     * 退出登录
     *
     */
    public signOut = async () => {
      const { props } = this;
      await api.account.signOut();
      // 清空用户状态
      props.updateUserInfo({
        isGet: true
      });
      // 清空我收藏的收藏品id
      props.updateCollectionFavoriteIdList([]);
      // 跳转到登录页
      Router.push({
        pathname: '/account/sign-in'
      });
    };

    public render = (): JSX.Element => {
      const { props } = this;
      return (
        <section className="header-action-container">
          <section className="header-action-inner-container">
            <section className="hello">
              <Link href="/home">
                <a href="/home" style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
                  <span>欢迎来到 {props.siteInfo.companyName}</span>
                </a>
              </Link>
            </section>
            <section className="action-tooltip">
              {props.userInfo.isGet && props.userInfo.username && (
                <Dropdown
                  trigger={['click', 'hover']}
                  placement="bottomRight"
                  overlay={
                    <Menu>
                      <Menu.Item key="1">
                        <Link href="/account/person/info">
                          <a href="/account/person/info" style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
                            <span>个人中心</span>
                          </a>
                        </Link>
                      </Menu.Item>
                      <Menu.Item key="2" onClick={this.signOut}>
                        <a href="javascript:void(0)" style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
                          <span>退出</span>
                        </a>
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <span className="menu-text">{props.userInfo.username} <Icon type="down"/></span>
                </Dropdown>
              )}
              {props.userInfo.isGet && !props.userInfo.username && (
                <section className="account-action-container">
                  <Link href="/account/sign-in">
                    <a href="/account/sign-in" className="separation" style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
                      登陆
                    </a>
                  </Link>
                  <Link href="/account/sign-up">
                    <a href="/account/sign-up" style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
                      注册
                    </a>
                  </Link>
                </section>
              )}
            </section>
          </section>
        </section>
      );
    };
  }
);
