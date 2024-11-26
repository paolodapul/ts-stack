// Define the type of actions that can be performed
type Action = {
  type: "insert" | "delete"
  content: string
}

export class TextEditor {
  private content: string;
  private actionStack: Action[]

  constructor() {
    this.content = ''
    this.actionStack = []
  }

  // Method to insert text
  insert(text: string): void {
    this.content += text;
    this.actionStack.push({type: 'insert', content: text})
  }

  // Method to delete text
  delete(count: number): void {
    const deletedText = this.content.slice(-count)
    this.content = this.content.slice(0, -count)
    this.actionStack.push({type: 'delete', content: deletedText})
  }

  // Method to undo the last action
  undo(): void {
    if (this.actionStack.length === 0) {
      console.log('Nothing to undo.')
      return
    }

    const lastAction = this.actionStack.pop()!;

    if (lastAction.type === 'insert') {
      // Remove the inserted text
      this.content = this.content.slice(0, -lastAction.content.length)
    } else if (lastAction.type === 'delete') {
      // Re-add the deleted text
      this.content += lastAction.content
    }
  }

  // Method to get the current content
  getContent(): string {
    return this.content
  }
}