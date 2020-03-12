/* 
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/

export class SandboxSetting {
  private readonly email: string;

  constructor(eMail: string) {
    this.email = eMail;
  }

  get eMail(): string {
    return this.email;
  }
}
