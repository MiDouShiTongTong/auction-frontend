import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import './index.scss';

// 当前组件的类型声明
interface Props {
}

interface State {
}

// 当前组件类
export default class LayoutFooter extends React.Component<Props, State> {
  public render = (): React.ReactElement<Props> => {
    return (
      <section className="layout-footer-container">
        <section className="footer-top-container">
          <section className="footer-top-inner-container">
            <section className="action-left-container">
              <section className="action-item-group">
                <p>帮助中心</p>
                <ul>
                  <li>买家指南</li>
                  <li>卖家指南</li>
                </ul>
              </section>
              <section className="action-item-group contact-action-item-group">
                <p>联系我们</p>
                <ul>
                  <li>中国新创文化艺术品有限公司</li>
                  <li><Icon type="environment"/>北京市东城区王府井大街1号嘉德艺术中心办公区三层</li>
                  <li><Icon type="phone"/>(852) 28152269</li>
                </ul>
              </section>
            </section>
            <section className="action-right-container">
              <p>微信公众号</p>
              <img
                src="data:image/png;base64,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"
                alt="微信公众号"/>
            </section>
          </section>
        </section>
        <section className="footer-bottom-container">
          <section className="footer-bottom-inner-container">
            <p>中国新创文化艺术品有限公司</p>
            <p>版权所有 ©www.qq.com 鄂ICP备15011961号-1</p>
          </section>
        </section>
      </section>
    );
  };
}
