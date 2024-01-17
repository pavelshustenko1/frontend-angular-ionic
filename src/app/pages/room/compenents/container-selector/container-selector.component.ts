import { CustomFormControlSelectModule } from '../../../../shared/components/custom-form-control-select/custom-form-control-select.module';
import { IonicModule, ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Thing } from '../../models/thing.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Container } from '../../models/container.model';

@Component({
  imports: [
    IonicModule,
    CommonModule,
    CustomFormControlSelectModule,
    ReactiveFormsModule,
  ],
  selector: 'app-container-selector',
  templateUrl: './container-selector.component.html',
  styleUrls: ['./container-selector.component.scss'],
  standalone: true,
})
export class ContainerSelectorComponent implements OnInit {
  @Input() thing?: Thing;
  @Input() containers?: Observable<Container[]>;

  public values = [{ key: 'Test', value: 'Test' }];

  constructor(private readonly modalCtrl: ModalController) {}

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  selectContainer(id: string) {
    this.modalCtrl.dismiss(
      {
        thingId: this.thing?.id,
        containerId: id,
      },
      'confirm'
    );
  }
}
