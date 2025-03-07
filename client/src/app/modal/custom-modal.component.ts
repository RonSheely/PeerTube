import { NgIf } from '@angular/common'
import { Component, ElementRef, inject, viewChild } from '@angular/core'
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'
import { logger } from '@root-helpers/logger'
import { GlobalIconComponent } from '../shared/shared-icons/global-icon.component'

@Component({
  selector: 'my-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: [ './custom-modal.component.scss' ],
  imports: [ NgIf, GlobalIconComponent ]
})
export class CustomModalComponent {
  private modalService = inject(NgbModal)

  readonly modal = viewChild<ElementRef>('modal')

  title: string
  content: string
  close: boolean
  cancel: { value: string, action?: () => void }
  confirm: { value: string, action?: () => void }

  private modalRef: NgbModalRef

  show (input: {
    title: string
    content: string
    close?: boolean
    cancel?: { value: string, action?: () => void }
    confirm?: { value: string, action?: () => void }
  }) {
    if (this.modalRef instanceof NgbModalRef && this.modalService.hasOpenModals()) {
      logger.error('Cannot open another custom modal, one is already opened.')
      return
    }

    const { title, content, close, cancel, confirm } = input

    this.title = title
    this.content = content
    this.close = close
    this.cancel = cancel
    this.confirm = confirm

    this.modalRef = this.modalService.open(this.modal(), {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    })
  }

  onCancelClick () {
    this.modalRef.close()

    const cancel = this.cancel
    if (typeof cancel.action === 'function') {
      cancel.action()
    }

    this.destroy()
  }

  onCloseClick () {
    this.modalRef.close()
    this.destroy()
  }

  onConfirmClick () {
    this.modalRef.close()

    const confirm = this.confirm
    if (typeof confirm.action === 'function') {
      confirm.action()
    }

    this.destroy()
  }

  hasCancel () {
    return typeof this.cancel !== 'undefined'
  }

  hasConfirm () {
    return typeof this.confirm !== 'undefined'
  }

  private destroy () {
    delete this.modalRef
    delete this.title
    delete this.content
    delete this.close
    delete this.cancel
    delete this.confirm
  }
}
