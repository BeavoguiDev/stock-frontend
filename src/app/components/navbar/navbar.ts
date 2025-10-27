import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  constructor(private toastr: ToastrService) {}
  showToast() {
  this.toastr.success('Bienvenue dans la barre de navigation !', 'Notification');
}

}
