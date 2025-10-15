'use client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mail } from 'lucide-react';
import { useState } from 'react';

const CoachNotes = () => {
  const [coachNotes, setCoachNotes] = useState('');
  return (
    <div className="bg-primary-200 border border-secondary p-5 h-fit">
      {/* Coach Notes */}
      <div className="space-y-2">
        <label className="text-white text-base font-medium">Coach Notes</label>
        <Textarea
          value={coachNotes}
          onChange={(e) => setCoachNotes(e.target.value)}
          className="bg-secondary caret-white  text-white placeholder:text-gray-500 min-h-[200px] mt-2 rounded-none"
          placeholder="Add notes about this week's performance..."
        />
      </div>

      {/* Send Email Button */}
      <Button className="w-full mt-6 bg-secondary rounded-none text-white hover:bg-gray-700 cursor-pointer">
        <Mail className="h-4 w-4 mr-2" />
        Send Weekly Review Email
      </Button>
    </div>
  );
};

export default CoachNotes;
