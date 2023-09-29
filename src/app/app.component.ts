import { Component, TemplateRef, ElementRef, ViewChild, ViewContainerRef, OnInit, AfterViewInit, Inject } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RoomsComponent } from './rooms/rooms.component';
import { localStorageToken } from './localstorage.token';
import { InitService } from './init.service';
import { ConfigService } from './services/config.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hotelinventoryapp';
  role = 'Admin';
  modalRef?: BsModalRef;

  constructor(private modalService: BsModalService,
    @Inject(localStorageToken) private localStorage: Storage,
    private initService: InitService,
    private configService: ConfigService,
    private router: Router){
      console.log(initService.config)
    };

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template)
  }

  onValueChange(value: any): void{
    console.log('onValueChange',value);
  }

  @ViewChild('name', {static: true}) name!: ElementRef;

  ngOnInit(){
    // this.router.events.subscribe((event)=>{
    //   console.log(event);
    // });
    this.router.events.pipe(
      filter((event)=> event instanceof NavigationStart)
    ).subscribe((event) => {
      console.log('Navigation Started');
    });

    this.router.events.pipe(
      filter((event)=> event instanceof NavigationEnd)
    ).subscribe((event) => {
      console.log('Navigation Completed');
    });

      // this.name.nativeElement.innerText = "Hilton Hotel";
      this.localStorage.setItem('name','Hilton Hotel');
  }

  // @ViewChild('user', { read: ViewContainerRef } ) vcr!: ViewContainerRef;

  // ngAfterViewInit(){
  //   const componentRef = this.vcr.createComponent(RoomsComponent);
  //   componentRef.instance.numberOfRooms = 50;
  // }
}
