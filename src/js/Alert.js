export default class Alert {
    constructor(jsonUrl) {
      this.jsonUrl = jsonUrl;
    }
  
    async fetchAlerts() {
      try {
        const response = await fetch(this.jsonUrl);
        const alerts = await response.json();
        return alerts;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching alerts:", error);
        return [];
      }
    }
  
    createAlertElement(alert) {
      const p = document.createElement("p");
      p.textContent = alert.message;
      p.style.backgroundColor = alert.background;
      p.style.color = alert.color;
      return p;
    }
  
    async displayAlerts() {
      const alerts = await this.fetchAlerts();
      if (alerts.length > 0) {
        const alertListSection = document.createElement("section");
        alertListSection.className = "alert-list";
  
        alerts.forEach(alert => {
          const alertElement = this.createAlertElement(alert);
          alertListSection.appendChild(alertElement);
        });
  
        const mainElement = document.querySelector("main");
        if (mainElement) {
          mainElement.prepend(alertListSection);
        } else {
          // eslint-disable-next-line no-console
          console.error("Main element not found");
        }
      }
    }
  }