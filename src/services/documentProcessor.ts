import { Document, ExtractedInfo } from '../types';

export class DocumentProcessor {
  static async processDocument(file: File): Promise<Document> {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const document: Document = {
      id: generateId(),
      name: file.name,
      type: this.getDocumentType(file.name),
      size: file.size,
      uploadedAt: new Date(),
      processed: true,
      extractedText: this.simulateTextExtraction(file.name),
      confidence: 0.85 + Math.random() * 0.15
    };

    return document;
  }

  static extractInformation(documents: Document[]): ExtractedInfo {
    const info: ExtractedInfo = {};

    documents.forEach(doc => {
      if (doc.extractedText) {
        // Simulate information extraction based on document content
        const text = doc.extractedText.toLowerCase();
        
        if (text.includes('incident') || text.includes('accident')) {
          info.incidentDate = this.extractDate(text);
          info.location = this.extractLocation(text);
          info.description = this.extractDescription(text);
        }

        if (text.includes('medical') || text.includes('diagnosis')) {
          info.medicalInfo = {
            diagnosis: this.extractMedicalInfo(text),
            provider: 'City Medical Center',
            treatmentDate: this.extractDate(text)
          };
        }

        if (text.includes('vehicle') || text.includes('car')) {
          info.vehicleInfo = {
            make: this.extractVehicleMake(text),
            model: this.extractVehicleModel(text),
            year: 2020 + Math.floor(Math.random() * 4),
            vin: this.generateVIN()
          };
        }
      }
    });

    return info;
  }

  private static getDocumentType(filename: string): 'pdf' | 'image' | 'text' {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return 'pdf';
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext || '')) return 'image';
    return 'text';
  }

  private static simulateTextExtraction(filename: string): string {
    const sampleTexts = [
      'On March 15, 2024, at approximately 2:30 PM, an incident occurred at the intersection of Main St and Oak Ave. Vehicle collision resulted in front-end damage to a 2022 Honda Accord. Driver reported minor injuries and was transported to City Medical Center for evaluation.',
      'Patient presented with lower back pain following workplace incident on February 28, 2024. MRI shows herniated disc at L4-L5. Recommended physical therapy and pain management. Total estimated treatment cost: $8,500.',
      'Property damage assessment for fire incident at 123 Elm Street on January 10, 2024. Electrical fire caused damage to kitchen and living room. Smoke damage throughout first floor. Estimated repair cost: $45,000.',
      'Life insurance claim for policy holder John Smith, policy number LI-789456. Date of death: April 2, 2024. Cause: Natural causes. Beneficiary: Jane Smith (spouse). Claim amount: $250,000.'
    ];
    
    return sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
  }

  private static extractDate(text: string): string {
    const dateRegex = /(\w+\s+\d{1,2},\s+\d{4})/;
    const match = text.match(dateRegex);
    return match ? match[1] : new Date().toLocaleDateString();
  }

  private static extractLocation(text: string): string {
    const locations = ['Main St and Oak Ave', '123 Elm Street', 'Highway 101', 'Downtown District'];
    return locations[Math.floor(Math.random() * locations.length)];
  }

  private static extractDescription(text: string): string {
    const words = text.split(' ');
    return words.slice(0, 20).join(' ') + '...';
  }

  private static extractMedicalInfo(text: string): string {
    const conditions = ['Lower back pain', 'Whiplash', 'Concussion', 'Broken arm', 'Sprained ankle'];
    return conditions[Math.floor(Math.random() * conditions.length)];
  }

  private static extractVehicleMake(text: string): string {
    const makes = ['Honda', 'Toyota', 'Ford', 'Chevrolet', 'BMW'];
    return makes[Math.floor(Math.random() * makes.length)];
  }

  private static extractVehicleModel(text: string): string {
    const models = ['Accord', 'Camry', 'F-150', 'Silverado', 'X3'];
    return models[Math.floor(Math.random() * models.length)];
  }

  private static generateVIN(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let vin = '';
    for (let i = 0; i < 17; i++) {
      vin += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return vin;
  }
}

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}