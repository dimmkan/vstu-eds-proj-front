import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Edses, EdsService} from "../../services/eds.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-eds-item',
  templateUrl: './eds-item.component.html',
  styleUrls: ['./eds-item.component.scss']
})

export class EdsItemComponent implements OnInit {

  //@ts-ignore
  eds: Edses
  //@ts-ignore
  form: FormGroup


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public edsService: EdsService,
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      //@ts-ignore
      this.eds = this.edsService.getById(+params.id)
    })

    this.form = new FormGroup({
      organization: new FormControl('', Validators.required),
      position: new FormControl(null),
      fullname: new FormControl('', Validators.required),
      accountId: new FormControl(null),
      inn: new FormControl('', Validators.required),
      certificateSerial: new FormControl('', Validators.required),
      vendor: new FormControl('', Validators.required),
      usageType: new FormControl('', Validators.required),
      fromDate: new FormControl(new Date(), Validators.required),
      toDate: new FormControl(new Date(), Validators.required),
      comment: new FormControl(null),
    })
  }

  deleteEds() {
    this.route.params.subscribe((params: Params) => {
      this.edsService.http.delete(`${environment.api_url}:3000/eds/delete/${params.id}`)
        .subscribe(
          () => {
            this.edsService.edses = this.edsService.edses.filter(p => p.id != +params.id)
            this.router.navigate(['/eds'])
          }
        )
    })
  }

  updateEds() {
    this.route.params.subscribe((params: Params) => {
      this.edsService.http.put(`${environment.api_url}:3000/eds/update/${params.id}`, {
        organization: this.eds.organization,
        position: this.eds.position,
        fullname: this.eds.fullname,
        accountId: this.eds.accountId,
        inn: this.eds.inn,
        certificateSerial: this.eds.certificateSerial,
        vendor: this.eds.vendor,
        usageType: this.eds.usageType,
        fromDate: this.eds.fromDate,
        toDate: this.eds.toDate,
        comment: this.eds.comment
      }).subscribe(
        () => {
          this.router.navigate(['/eds'])
        }
      )
    })
  }
}
