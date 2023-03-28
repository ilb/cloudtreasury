import { notification } from 'antd';

export default class Notification {
  static openNotification(type, message, description, duration) {
    notification[type]({ message, description, duration });
  }

  static success(title = 'Успешно!', description = '', duration = 2.5) {
    this.openNotification('success', title, description, duration);
  }

  static info(title, description = '', duration = 5) {
    this.openNotification('info', title, description, duration);
  }

  static warning(title, description = '', duration = 5) {
    this.openNotification('warning', title, description, duration);
  }

  static error(title = 'Упс... Что-то пошло не так.', description = '', duration = 5) {
    this.openNotification('error', title, description, duration);
  }
}
