// Simple in-memory storage for quick deployment (no MongoDB required)
class SimpleStorage {
  constructor() {
    this.contacts = [];
    this.idCounter = 1;
  }

  // Save contact message
  saveContact(contactData) {
    const contact = {
      _id: this.idCounter++,
      id: this.idCounter - 1,
      name: contactData.name,
      email: contactData.email,
      subject: contactData.subject,
      message: contactData.message,
      status: 'new',
      ipAddress: contactData.ipAddress || '',
      userAgent: contactData.userAgent || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.contacts.push(contact);
    return contact;
  }

  // Get all contacts
  getAllContacts(options = {}) {
    const { status, page = 1, limit = 10 } = options;
    
    let filtered = this.contacts;
    if (status) {
      filtered = this.contacts.filter(contact => contact.status === status);
    }
    
    // Sort by newest first
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    const skip = (page - 1) * limit;
    const paginated = filtered.slice(skip, skip + limit);
    
    return {
      contacts: paginated,
      total: filtered.length,
      page: parseInt(page),
      pages: Math.ceil(filtered.length / limit)
    };
  }

  // Get contact by ID
  getContactById(id) {
    return this.contacts.find(contact => contact._id == id || contact.id == id);
  }

  // Update contact status
  updateContact(id, updates) {
    const contact = this.getContactById(id);
    if (contact) {
      Object.assign(contact, updates, { updatedAt: new Date() });
      return contact;
    }
    return null;
  }

  // Get contact count
  getContactCount() {
    return this.contacts.length;
  }
}

// Export singleton instance
const storage = new SimpleStorage();
module.exports = storage;
