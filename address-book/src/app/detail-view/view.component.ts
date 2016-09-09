import { Component, OnInit } from '@angular/core';
import { AddressService } from '../service/address.service';
import { AddressInterface } from '../service/address.interface';

@Component({
  selector: 'address-view',
  styles:[
    `
    .btn-place {
      padding: 3px;
      margin-right: 10px;
      position: absolute;
      top: 0px;
      right: 0px;
    }
    .nav-font {
      font-size: 1.0em;
      color: #337ab7;
      border: 1px solid #337ab7;
      border-radius: 5px;
      padding: 1px 4px 1px 4px;
    }
    `
  ],
  template: `
    <div class="btn-place">
      <a class="nav-font" routerLink="/management">NEW</a>
    </div>
    <search-box (handleSendName) = "handleSetSearchData($event)"></search-box>
    <contact-table [contactData] = "_contectData" [searchText] = "_searchText" [page]="'view'"
      (handleToggleFavorite) = "handleToggleFavorite($event)"
      (handleDeleteUser) = "handleDeleteUser($event)"
      ></contact-table>
  `,
  providers: [AddressService]
})
export class ViewComponent {
  constructor(private addressService: AddressService) {}
  _contectData : AddressInterface[];
  _searchText : string;

  ngOnInit(){
    this._contectData = this.addressService.getContectData();
  }
  
  handleSetSearchData(name: string){
    console.log(name);
    this._searchText = name;
  }

  handleToggleFavorite(userID: number){
    this._contectData = this.addressService.setToggleFavorite(userID);
  }

  handleDeleteUser(userID: number){
    this._contectData = this.addressService.setDeleteUser(userID);
  }
}
