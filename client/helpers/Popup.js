import { Modal } from 'antd';

export default class Popup {
  static confirm(description, onOk) {
    Modal.confirm({
      cancelText: 'Отмена',
      title: description,
      onOk
    });
  }
}