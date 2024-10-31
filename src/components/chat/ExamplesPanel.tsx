// src/components/chat/ExamplesPanel.tsx

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FiPlus } from 'react-icons/fi';
import { ExamplesPanelProps } from '@/types/chat';

export const ExamplesPanel: React.FC<ExamplesPanelProps> = ({
  selectedScenario,
  businessScenarios,
  onExampleSelect,
  onAddExample,
}) => {
  const [isAddingExample, setIsAddingExample] = useState(false);
  const [newExampleQuery, setNewExampleQuery] = useState('');
  const [newExampleResponse, setNewExampleResponse] = useState('');

  const currentScenario = businessScenarios.find(scenario => scenario.name === selectedScenario);

  const handleAddExample = () => {
    if (newExampleQuery && newExampleResponse) {
      onAddExample(newExampleQuery, newExampleResponse);
      setNewExampleQuery('');
      setNewExampleResponse('');
      setIsAddingExample(false);
    }
  };

  if (!currentScenario) return null;

  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="examples">
          <AccordionTrigger>Few-Shot Learning Examples</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {currentScenario.examples.map((example, index) => (
                <div key={index}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onExampleSelect(example)}
                    className="w-full text-left"
                  >
                    {example.content.substring(0, 50)}...
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddingExample(true)}
                className="w-full mt-2"
              >
                <FiPlus className="mr-2" /> Add New Example
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Dialog open={isAddingExample} onOpenChange={setIsAddingExample}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Example</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="new-example-query">Example Query</Label>
              <Input
                id="new-example-query"
                value={newExampleQuery}
                onChange={(e) => setNewExampleQuery(e.target.value)}
                placeholder="Enter an example query"
              />
            </div>
            <div>
              <Label htmlFor="new-example-response">Example Response</Label>
              <Input
                id="new-example-response"
                value={newExampleResponse}
                onChange={(e) => setNewExampleResponse(e.target.value)}
                placeholder="Enter an example response"
              />
            </div>
            <Button onClick={handleAddExample}>Add Example</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};