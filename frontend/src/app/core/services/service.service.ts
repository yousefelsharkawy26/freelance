import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
private url = "http://localhost:5000/services/"

  constructor(private http: HttpClient) { }

  createService(service: any) {
    return this.http.post(this.url + 'create', service);
  }

  getAllServices() {
    return this.http.get(this.url);
  }

  getServiceById(id: any) {
    return this.http.get(this.url + id);
  }

  getMyServices(userId: any) {
    return this.http.get(this.url + 'my/'+ userId);
  }

  deleteService(id: any) {
    return this.http.delete(this.url + id);
  }
}
